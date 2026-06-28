import { useNavigate, useParams, useLocation } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Slider } from "../components/ui/slider";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  TrendingUp,
  Target,
  Sparkles,
  Eye,
  FileText,
  BarChart3,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export function AnalysisPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const articleText = location.state?.articleText || "";
  const analysisResult = location.state?.analysisResult;

  

  const credibilityMetrics = [
    { metric: "Source Authority", score: 65 },
    { metric: "Evidence Quality", score: 42 },
    { metric: "Language Objectivity", score: 38 },
    { metric: "Fact Consistency", score: 55 },
    { metric: "Citation Quality", score: 48 },
  ];

  const timelineData = [
    { time: "0s", credibility: 100 },
    { time: "2s", credibility: 85 },
    { time: "4s", credibility: 65 },
    { time: "6s", credibility: 45 },
    { time: "8s", credibility: 28 },
  ];

  const fakeNewsScore = analysisResult?.fake_score || 0;

const confidenceLevel = analysisResult?.confidence || 0;

let politicalBias = 0;

const sentimentData = [
  { name: "Factual", value: 100 - fakeNewsScore },
  { name: "Emotional", value: fakeNewsScore / 2 },
  { name: "Sensational", value: fakeNewsScore / 2 },
];

const suspiciousSentences =
  analysisResult?.suspicious_sentences || [];

  const COLORS = ["#3b82f6", "#a855f7", "#ec4899"];

  const getVerdictConfig = () => {
    if (fakeNewsScore >= 70) {
      return {
        icon: XCircle,
        label: "High Risk - Likely Misinformation",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        glowColor: "shadow-red-500/20",
      };
    } else if (fakeNewsScore >= 40) {
      return {
        icon: AlertTriangle,
        label: "Medium Risk - Verify Claims",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        glowColor: "shadow-yellow-500/20",
      };
    } else {
      return {
        icon: CheckCircle2,
        label: "Low Risk - Appears Credible",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        glowColor: "shadow-green-500/20",
      };
    }
  };

  const verdict = getVerdictConfig();
  const VerdictIcon = verdict.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-6 h-6 text-blue-400" />
              <Sparkles className="w-3 h-3 text-purple-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FACT or TRAP
            </h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Analysis ID Badge */}
        <div className="mb-6">
          <Badge variant="outline" className="bg-slate-800/50 border-blue-500/30 text-blue-300">
            <FileText className="w-3 h-3 mr-1" />
            Analysis ID: {id}
          </Badge>
        </div>

        {/* Main Verdict Card */}
        <Card className={`p-8 mb-8 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border ${verdict.borderColor} backdrop-blur-xl shadow-2xl ${verdict.glowColor}`}>
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-2xl ${verdict.bgColor} flex items-center justify-center`}>
              <VerdictIcon className={`w-10 h-10 ${verdict.color}`} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-red-300 drop-shadow-lg mb-2">{verdict.label}</h2>
              <p className="text-slate-400">
                AI confidence level: <span className="text-white font-semibold">{confidenceLevel}%</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold mb-1 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {fakeNewsScore}%
              </div>
              <p className="text-sm text-slate-400">Misinformation Risk</p>
            </div>
          </div>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Fake News Probability */}
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-semibold text-white">Fake News Score</h3>
            </div>
            <div className="space-y-3">
              <Progress value={fakeNewsScore} className="h-3 bg-slate-700" />
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Credible</span>
                <span className="text-slate-400">Suspicious</span>
              </div>
            </div>
          </Card>

          {/* Political Bias */}
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Political Bias</h3>
            </div>
            <div className="space-y-3">
              <div className="relative h-3 bg-gradient-to-r from-blue-500 via-slate-600 to-red-500 rounded-full">
                <div
                  className="absolute w-4 h-4 bg-white rounded-full top-1/2 -translate-y-1/2 shadow-lg"
                  style={{ left: `${((politicalBias + 100) / 200) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-400">Left</span>
                <span className="text-slate-400">Center: {politicalBias > 0 ? '+' : ''}{politicalBias}</span>
                <span className="text-red-400">Right</span>
              </div>
            </div>
          </Card>

          {/* Confidence Level */}
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">AI Confidence</h3>
            </div>
            <div className="space-y-3">
              <Progress value={confidenceLevel} className="h-3 bg-slate-700" />
              <p className="text-2xl font-bold text-center text-blue-400">{confidenceLevel}%</p>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Sentiment Distribution */}
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <h3 className="font-semibold text-white text-xl mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-400" />
              Content Analysis
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Credibility Timeline */}
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <h3 className="font-semibold text-white text-xl mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Credibility Timeline
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="credibility" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Credibility Metrics Radar */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
          <h3 className="font-semibold text-white text-xl mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Credibility Metrics Analysis
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={credibilityMetrics}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
              <Radar name="Score" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Suspicious Sentences */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
          <h3 className="font-semibold text-white text-xl mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Suspicious Sentences Detected
          </h3>
          <div className="space-y-4">
            {suspiciousSentences.map((sentence: any, index: number) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-800/50 border border-red-500/20 hover:border-red-500/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Badge
                    variant="outline"
                    className={
                      sentence.severity === "high"
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    }
                  >
                    {sentence.severity === "high" ? "High Risk" : "Medium Risk"}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-slate-200 mb-2 italic">"{sentence.text}"</p>
                    <p className="text-sm text-slate-400">⚠️ {sentence.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

       {/* AI Explanation */}
<Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
  <h3 className="font-semibold text-white text-xl mb-4 flex items-center gap-2">
    <Brain className="w-5 h-5 text-blue-400" />
    AI Explanation
  </h3>

  <div className="space-y-4 text-slate-300">
    
    <p>
      {fakeNewsScore >= 70 ? (
        <>
          Our advanced AI analysis has identified several red flags in this
          article. The content demonstrates a{" "}
          <span className="text-red-400 font-semibold">
            high probability ({fakeNewsScore}%)
          </span>{" "}
          of containing misinformation or misleading statements.
        </>
      ) : fakeNewsScore >= 40 ? (
        <>
          Our AI system detected some potentially questionable patterns in this
          article. The content demonstrates a{" "}
          <span className="text-yellow-400 font-semibold">
            moderate probability ({fakeNewsScore}%)
          </span>{" "}
          of misleading or emotionally manipulative language.
        </>
      ) : (
        <>
          Our AI analysis found relatively few signs of misinformation. The
          article demonstrates a{" "}
          <span className="text-green-400 font-semibold">
            low probability ({fakeNewsScore}%)
          </span>{" "}
          of containing misleading content and appears comparatively credible.
        </>
      )}
    </p>

    <p>
      {suspiciousSentences.length > 0 ? (
        <>
          The analysis detected{" "}
          <span className="text-red-300 font-semibold">
            {suspiciousSentences.length} suspicious sentence
            {suspiciousSentences.length > 1 ? "s" : ""}
          </span>{" "}
          containing sensationalist wording, exaggerated claims, or emotionally
          manipulative rhetoric.
        </>
      ) : (
        <>
          The article contains relatively neutral language with very few
          suspicious linguistic patterns detected during analysis.
        </>
      )}{" "}
      
      The article shows a{" "}
      
      <span className="text-purple-400 font-semibold">
        {Math.abs(politicalBias) > 60
          ? "strong"
          : Math.abs(politicalBias) > 30
          ? "moderate"
          : "minimal"}{" "}
        political bias
      </span>.
    </p>

    <p>
      {fakeNewsScore >= 70 ? (
        <>
          We strongly recommend verifying all claims in this article through
          multiple trusted and fact-checked sources before accepting the
          information as accurate.
        </>
      ) : fakeNewsScore >= 40 ? (
        <>
          Some claims in this article may require additional verification.
          Cross-referencing with reputable sources is recommended.
        </>
      ) : (
        <>
          The article appears comparatively reliable, though independent
          verification is always recommended for important claims or statistics.
        </>
      )}
    </p>

  </div>
</Card>
      </div>
    </div>
  );
}
