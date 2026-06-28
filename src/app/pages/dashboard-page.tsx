import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Brain,
  Sparkles,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  BarChart3,
  Home,
  Calendar,
  ExternalLink,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

interface AnalysisRecord {
  id: string;
  title: string;
  url: string;
  date: string;
  score: number;
  verdict: "low" | "medium" | "high";
  bias: number;
}

export function DashboardPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");

  // Mock data for previous analyses
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>([]);
  useEffect(() => {
  fetch("http://127.0.0.1:5000/history")
    .then((response) => response.json())
    .then((data) => {
      console.log("History Data:", data);

      const formattedData = data.map((item: any) => ({
        id: item.id.toString(),

        title: item.article_text
          ? item.article_text.substring(0, 60) + "..."
          : "Untitled Analysis",

        url: item.url || "No URL",

        date: item.created_at
          ? item.created_at.split(" ")[0]
          : "Unknown",

        score: item.fake_score || 0,

        verdict:
          item.fake_score >= 70
            ? "high"
            : item.fake_score >= 40
            ? "medium"
            : "low",

        bias: 0,
      }));

      console.log("Formatted Data:", formattedData);

      setAnalyses(formattedData);
    })
    .catch((error) => {
      console.error("Failed to fetch history:", error);
    });
}, []);

  // Statistics data
 const [weeklyAnalyses, setWeeklyAnalyses] = useState([]);
 useEffect(() => {
  fetch("http://127.0.0.1:5000/weekly-stats")
    .then((response) => response.json())
    .then((data) => setWeeklyAnalyses(data))
    .catch((error) =>
      console.error("Failed to fetch weekly stats:", error)
    );
}, []);

  const credibilityTrend = [
    { week: "Week 1", avgScore: 45 },
    { week: "Week 2", avgScore: 52 },
    { week: "Week 3", avgScore: 38 },
    { week: "Week 4", avgScore: 48 },
  ];

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 border-red-500/30 text-red-400"
          >
            High Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
          >
            Medium Risk
          </Badge>
        );
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 border-green-500/30 text-green-400"
          >
            Low Risk
          </Badge>
        );
    }
  };

  const totalAnalyses = analyses.length;
  const highRiskCount = analyses.filter(
    (a) => a.verdict === "high",
  ).length;
 const avgScore =
  analyses.length > 0
    ? Math.round(
        analyses.reduce((acc, a) => acc + a.score, 0) /
          analyses.length
      )
    : 0;
  const filteredAnalyses = analyses.filter((analysis) => {
  const matchesSearch =
    analysis.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    analysis.url
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

  const matchesRisk =
    riskFilter === "all" ||
    analysis.verdict === riskFilter;

  return matchesSearch && matchesRisk;
});

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
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-blue-400" />
              <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FACT or TRAP
            </h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">
            Analysis Dashboard
          </h2>
          <p className="text-slate-400">
            Track your article analyses and insights
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-blue-300 mb-1">
              {totalAnalyses}
            </p>
            <p className="text-sm text-slate-400">
              Total Analyses
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-xs text-red-400 font-semibold">
                ALERT
              </span>
            </div>
            <p className="text-3xl font-bold text-red-400 mb-1">
              {highRiskCount}
            </p>
            <p className="text-sm text-slate-400">
              High Risk Detected
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-purple-400 font-semibold">
                AVG
              </span>
            </div>
            <p className="text-3xl font-bold text-violet-300 mb-1">
              {avgScore}%
            </p>
            <p className="text-sm text-slate-400">
              Average Risk Score
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-green-400" />
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-400 mb-1">
              {analyses.length - highRiskCount}
            </p>
            <p className="text-sm text-slate-400">
              Verified Articles
            </p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <h3 className="font-semibold text-white text-xl mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Weekly Analysis Activity
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyAnalyses}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Credibility Trend */}
          <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <h3 className="font-semibold text-white text-xl mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Average Risk Score Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={credibilityTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: "#a855f7", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by title or URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 h-12"
              />
            </div>
            <select
  value={riskFilter}
  onChange={(e) => setRiskFilter(e.target.value)}
  className="bg-slate-800 border border-white/10 rounded-lg px-4 text-white"
>
  <option value="all">All</option>
  <option value="high">High Risk</option>
  <option value="medium">Medium Risk</option>
  <option value="low">Low Risk</option>
</select>
          </div>
        </Card>

        {/* Recent Analyses List */}
        <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
          <h3 className="font-semibold text-white text-xl mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Recent Analyses
          </h3>
          <div className="space-y-4">
            {filteredAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className="p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                onClick={() =>
                  navigate(`/analysis/${analysis.id}`)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getVerdictBadge(analysis.verdict)}
                      <span className="text-xs text-slate-500">
                        {analysis.date}
                      </span>
                    </div>
                    <h4 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {analysis.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">
                        {analysis.url}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-3xl font-bold mb-1 ${
                        analysis.score >= 70
                          ? "text-red-400"
                          : analysis.score >= 40
                            ? "text-yellow-400"
                            : "text-green-400"
                      }`}
                    >
                      {analysis.score}%
                    </div>
                    <p className="text-xs text-slate-500">
                      Risk Score
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
