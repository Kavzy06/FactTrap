
  # FactTrap - AI Powered Fake News Detection Platform

## Overview

FactTrap is a full stack AI powered fake news detection platform that analyzes news articles and URLs to determine their credibility.

The platform combines Transformer based NLP models, sentiment analysis, and linguistic pattern detection to generate misinformation risk scores and provide explainable insights.

## Features

* AI powered fake news detection using Transformer models
* Sentiment analysis using VADER
* Analyze both article text and URLs
* Automatic article extraction from URLs
* Dynamic analytics dashboard
* Historical analysis tracking
* Weekly activity visualization
* Search and filtering of previous analyses
* PostgreSQL based persistent storage

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Recharts

### Backend

* Flask
* Python
* REST APIs

### Database

* PostgreSQL

### AI/NLP

* Hugging Face Transformers
* RoBERTa
* VADER Sentiment Analysis
* Newspaper3k

## System Architecture

Frontend (React) → Flask REST API → AI/NLP Models → PostgreSQL Database

## Screenshots

### Landing Page

![Landing Page](screenshots/landing page.png)

---

### Analysis Results

![Analysis Results](screenshots/analysis results.png)

---

### Analytics Dashboard

![Dashboard](screenshots/dashboard.png)

---

### Analysis History

![History](screenshots/history.png)

## Installation

### Clone the repository

```bash
git clone https://github.com/Kavzy06/FactTrap.git
cd FactTrap
```

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

## Future Improvements

* Advanced fact checking APIs
* User authentication
* Export reports as PDF
* Detailed analysis pages
* Enhanced explainable AI features

## Author

Kavya Srivastava

  