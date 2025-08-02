import { Button } from "@/components/ui/button";
import { Trophy, Star, RotateCcw, Home, Share2, Download, Award } from "lucide-react";
import { GameStats } from "./GameStats";
import { useEffect, useState } from "react";

interface GameOverScreenProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverScreen = ({ 
  score, 
  totalQuestions, 
  correctAnswers, 
  accuracy, 
  onRestart, 
  onHome 
}: GameOverScreenProps) => {
  const [highScore, setHighScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('pyquiz-highscore');
    const currentHighScore = savedHighScore ? parseInt(savedHighScore) : 0;
    setHighScore(currentHighScore);

    // Check if this is a new record
    if (score > currentHighScore) {
      setIsNewRecord(true);
      localStorage.setItem('pyquiz-highscore', score.toString());
      setHighScore(score);
    }

    // Save game history
    const gameResult = {
      score,
      accuracy,
      correctAnswers,
      totalQuestions,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    const history = JSON.parse(localStorage.getItem('pyquiz-history') || '[]');
    history.push(gameResult);
    // Keep only last 10 games
    if (history.length > 10) {
      history.shift();
    }
    localStorage.setItem('pyquiz-history', JSON.stringify(history));
  }, [score, accuracy, correctAnswers, totalQuestions]);

  const downloadResults = () => {
    const results = {
      score,
      accuracy: accuracy.toFixed(1) + '%',
      correctAnswers: `${correctAnswers}/${totalQuestions}`,
      level: Math.floor(score / 1000) + 1,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pyquiz-results-${Date.now()}.json`;
    link.click();
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { text: "Outstanding Performance", color: "text-accent" };
    if (accuracy >= 75) return { text: "Great Job", color: "text-success" };
    if (accuracy >= 60) return { text: "Good Effort", color: "text-primary" };
    return { text: "Keep Practicing", color: "text-warning" };
  };

  const getStars = () => {
    if (accuracy >= 90) return 3;
    if (accuracy >= 75) return 2;
    if (accuracy >= 60) return 1;
    return 0;
  };

  const performance = getPerformanceMessage();
  const stars = getStars();
  const level = Math.floor(score / 1000) + 1;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-scale">
      {/* Main Results Card */}
      <div className="glass-card text-center space-y-6">
        {/* Trophy Animation */}
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-gradient-primary shadow-glow animate-bounce-in">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Results Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Quiz Complete!
          </h1>
          <p className={`text-2xl font-semibold ${performance.color}`}>
            {performance.text}
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 transition-all duration-300 animate-bounce-in ${
                star <= stars 
                  ? "text-accent fill-accent" 
                  : "text-muted-foreground"
              }`}
              style={{ animationDelay: `${star * 0.2}s` }}
            />
          ))}
        </div>

        {/* Score Display with High Score */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-glass border border-glass-border">
            <div className={`text-4xl font-bold mb-2 ${isNewRecord ? 'text-accent animate-pulse-glow' : 'text-primary'}`}>
              {score.toLocaleString()}
            </div>
            <div className="text-lg text-muted-foreground">
              Final Score
            </div>
            {isNewRecord && (
              <div className="mt-2 flex items-center gap-2 text-accent animate-bounce-in">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">NEW RECORD!</span>
              </div>
            )}
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-glass border border-glass-border">
            <div className="text-4xl font-bold text-secondary mb-2">
              {highScore.toLocaleString()}
            </div>
            <div className="text-lg text-muted-foreground">
              High Score
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GameStats
          score={score}
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          streak={0}
          accuracy={accuracy}
          level={level}
        />

        {/* Achievement Card */}
        <div className="glass-card space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Achievements
          </h3>
          
          <div className="space-y-3">
            {accuracy >= 90 && (
              <div className="p-3 rounded-xl bg-accent/20 border border-accent/30 animate-slide-up">
                <div className="font-medium text-accent">Perfect Score!</div>
                <div className="text-sm text-muted-foreground">Achieved 90%+ accuracy</div>
              </div>
            )}
            
            {correctAnswers >= 10 && (
              <div className="p-3 rounded-xl bg-success/20 border border-success/30 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="font-medium text-success">Double Digits</div>
                <div className="text-sm text-muted-foreground">Answered 10+ questions correctly</div>
              </div>
            )}
            
            {score >= 1000 && (
              <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="font-medium text-primary">Score Master</div>
                <div className="text-sm text-muted-foreground">Reached 1000+ points</div>
              </div>
            )}

            {!accuracy && !correctAnswers && !score && (
              <div className="p-3 rounded-xl bg-muted/20 border border-muted/30 text-center">
                <div className="text-muted-foreground">Complete quizzes to unlock achievements!</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="gaming" 
          size="xl" 
          onClick={onRestart}
          className="group"
        >
          <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
          Play Again
        </Button>
        
        <Button 
          variant="glass" 
          size="xl" 
          onClick={onHome}
          className="group"
        >
          <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
          Choose Category
        </Button>
        
        <Button 
          variant="outline" 
          size="xl"
          onClick={downloadResults}
          className="group"
        >
          <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform duration-300" />
          Download Results
        </Button>
        
        <Button 
          variant="neon" 
          size="xl"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'PyQuiz Results',
                text: `I just scored ${score} points on PyQuiz with ${accuracy.toFixed(1)}% accuracy!`,
                url: window.location.href
              });
            }
          }}
          className="group"
        >
          <Share2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
          Share
        </Button>
      </div>
    </div>
  );
};