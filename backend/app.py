from transformers import pipeline
import psycopg2
from newspaper import Article
from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

sentiment_analyzer = SentimentIntensityAnalyzer()
fake_news_classifier = pipeline(
    "text-classification",
    model="hamzab/roberta-fake-news-classification"
)

# PostgreSQL Connection
conn = psycopg2.connect(
    host="localhost",
    database="facttrap",
    user="postgres",
    password="HEDWIG"
)

cursor = conn.cursor()


@app.route("/")
def home():
    return {"message": "Fact or Trap backend is running"}


@app.route("/analyze", methods=["POST"])
def analyze():

    print("Analyze endpoint hit!")

    data = request.json

    article = data.get("article", "")
    url = data.get("url", "")

    # Extract article from URL if provided
    if url:
        try:
            news_article = Article(url)

            news_article.download()
            news_article.parse()

            article = news_article.text

        except Exception as e:
            return jsonify({
                "error": f"Failed to extract article: {str(e)}"
            }), 400

    lower_text = article.lower()

    sentiment = sentiment_analyzer.polarity_scores(article)

    compound_score = sentiment["compound"]
    negative_score = sentiment["neg"]
    positive_score = sentiment["pos"]
    neutral_score = sentiment["neu"]

    # AI-based fake news detection
    # AI-based fake news detection
    text_for_ai = article[:512]

    try:
        prediction = fake_news_classifier(text_for_ai)[0]

        print("AI Prediction:", prediction)

        label = prediction["label"]
        ai_confidence = prediction["score"]

        # Convert AI output to fake score
        if "fake" in label.lower():
            fake_score = int(ai_confidence * 100)
        else:
            fake_score = int((1 - ai_confidence) * 100)

    except Exception as e:
        print("AI Error:", e)
        fake_score = 50

    # Keep these for explainability
    suspicious_words = [
        "shocking",
        "breaking",
        "secret",
        "miracle",
        "conspiracy",
        "fake",
        "exposed",
        "propaganda",
        "they don't want you to know",
    ]

    suspicious_sentences = []

    # Suspicious sentence detection
    sentences = article.split(".")

    for sentence in sentences:
        for word in suspicious_words:
            if word in sentence.lower():
                suspicious_sentences.append({
                    "text": sentence.strip(),
                    "reason": f'Suspicious phrase detected: "{word}"'
                })

    # Cap score
    if fake_score > 100:
        fake_score = 100

    confidence = 100 - fake_score // 2

    # Save to PostgreSQL
    print("Analysis being saved...")

    cursor.execute(
        """
        INSERT INTO analyses
        (article_text, url, fake_score, confidence)
        VALUES (%s, %s, %s, %s)
        """,
        (
            article,
            url,
            fake_score,
            confidence
        )
    )

    conn.commit()

    print("Analysis saved!")

    return jsonify({
        "fake_score": fake_score,
        "confidence": confidence,
        "suspicious_sentences": suspicious_sentences,
        "sentiment": {
            "positive": positive_score,
            "negative": negative_score,
            "neutral": neutral_score,
            "compound": compound_score
        }
    })


@app.route("/history", methods=["GET"])
def history():

    cursor.execute("""
        SELECT id, article_text, url, fake_score, confidence, created_at
        FROM analyses
        ORDER BY created_at DESC
        LIMIT 10
    """)

    rows = cursor.fetchall()

    history_data = []

    for row in rows:
        history_data.append({
            "id": row[0],
            "article_text": row[1][:100] + "..." if row[1] else "",
            "url": row[2],
            "fake_score": row[3],
            "confidence": row[4],
            "created_at": str(row[5])
        })

    return jsonify(history_data)

@app.route("/stats", methods=["GET"])
def stats():

    cursor.execute("SELECT COUNT(*) FROM analyses")
    total_analyses = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM analyses WHERE fake_score >= 70"
    )
    high_risk = cursor.fetchone()[0]

    cursor.execute(
        "SELECT AVG(fake_score) FROM analyses"
    )
    avg_score = cursor.fetchone()[0]

    if avg_score is None:
        avg_score = 0

    return jsonify({
        "total_analyses": total_analyses,
        "high_risk": high_risk,
        "average_score": round(avg_score, 2)
    })
@app.route("/weekly-stats", methods=["GET"])
def weekly_stats():

    cursor.execute("""
        SELECT
            TO_CHAR(created_at, 'Dy') as day,
            COUNT(*) as count
        FROM analyses
        WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
        GROUP BY day
    """)

    rows = cursor.fetchall()

    days = {
        "Mon": 0,
        "Tue": 0,
        "Wed": 0,
        "Thu": 0,
        "Fri": 0,
        "Sat": 0,
        "Sun": 0
    }

    for row in rows:
        days[row[0].strip()] = row[1]

    result = []

    for day, count in days.items():
        result.append({
            "day": day,
            "count": count
        })

    return jsonify(result)
if __name__ == "__main__":
    app.run(debug=True)
    