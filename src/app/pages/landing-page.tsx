import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Brain, Sparkles, Shield, Target, TrendingUp, History } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
  setIsAnalyzing(true);

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      article: articleText,
      url: url,
      }),
    });

    const result = await response.json();
    console.log(result);

    const analysisId = Math.random().toString(36).substring(7);

    navigate(`/analysis/${analysisId}`, {
      state: {
        articleText,
        analysisResult: result,
      },
    });

  } catch (error) {
    console.error("Analysis failed:", error);
  } finally {
    setIsAnalyzing(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
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
            onClick={() => navigate("/dashboard")}
            className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10"
          >
            <History className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">AI-Powered Truth Detection</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Trap the Fake with
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Advanced AI algorithms analyze news articles for misinformation, bias, and emotional manipulation in seconds.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Credibility Score</h3>
            <p className="text-slate-400 text-sm">
              Real-time credibility assessment using multi-layered AI verification
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bias Detection</h3>
            <p className="text-slate-400 text-sm">
              Identify political leanings and detect subtle manipulation tactics
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sentiment Analysis</h3>
            <p className="text-slate-400 text-sm">
              Uncover emotional manipulation and sensationalist writing patterns
            </p>
          </div>
        </div>

        {/* Analysis Input Section */}
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
            <Tabs defaultValue="url" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 p-1 mb-8">
                <TabsTrigger value="url" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                  URL Analysis
                </TabsTrigger>
                <TabsTrigger value="text" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
                  Paste Article
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Article URL
                  </label>
                  <Input
                    type="url"
                    placeholder="Place article url here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 h-14 text-lg focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Article Text
                  </label>
                  <Textarea
                    placeholder="Paste the article text here..."
                    value={articleText}
                    onChange={(e) => setArticleText(e.target.value)}
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 min-h-[200px] text-base focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>
              </TabsContent>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze Article
                  </>
                )}
              </Button>
            </Tabs>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-400">
            Trusted by fact-checkers, journalists, and researchers worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
