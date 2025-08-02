import { useState } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { PyQuizLogo } from "@/components/PyQuizLogo";
import { CategorySelector } from "@/components/CategorySelector";
import { QuizGame } from "@/components/QuizGame";
import { GameOverScreen } from "@/components/GameOverScreen";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

type GameState = "menu" | "category" | "playing" | "complete";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const quiz = useQuiz(selectedCategory);

  const handleStartGame = () => {
    setGameState("category");
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    quiz.startQuiz(categoryId);
    setGameState("playing");
  };

  const handleAnswer = (correct: boolean) => {
    // Small delay to show result animation
    setTimeout(() => {
      if (quiz.isComplete) {
        setGameState("complete");
      }
    }, 500);
  };

  const handleRestart = () => {
    quiz.resetQuiz();
    setGameState("category");
  };

  const handleHome = () => {
    quiz.resetQuiz();
    setSelectedCategory(null);
    setGameState("menu");
  };

  const renderContent = () => {
    switch (gameState) {
      case "menu":
        return (
          <div className="min-h-screen flex items-center justify-center relative">
            <div className="w-full max-w-6xl mx-auto px-6">
              {/* Hero Section */}
              <div className="text-center space-y-8 animate-fade-in-scale">
                <PyQuizLogo size="lg" />
                
                <div className="relative">
                  <img 
                    src={heroImage} 
                    alt="PyQuiz Hero" 
                    className="w-full max-w-2xl mx-auto rounded-3xl shadow-glass opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-glass rounded-3xl" />
                </div>

                <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in" style={{ animationDelay: "0.5s" }}>
                  <button 
                    onClick={handleStartGame}
                    className="bg-gradient-primary text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-glow hover:shadow-neon transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    Start Quiz
                  </button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Choose from 10+ categories</span>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up" style={{ animationDelay: "0.7s" }}>
                  {[
                    { title: "Real-time Scoring", desc: "Earn points based on speed and accuracy", icon: "zap" },
                    { title: "Multiple Categories", desc: "Python, Web Dev, Algorithms & more", icon: "target" },
                    { title: "Progress Tracking", desc: "Level up and unlock achievements", icon: "trending-up" },
                  ].map((feature, index) => (
                    <div key={index} className="glass-card text-center hover:shadow-glow transition-all duration-300">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-primary flex items-center justify-center">
                        {feature.icon === "zap" && <div className="w-6 h-6 bg-white rounded" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />}
                        {feature.icon === "target" && <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full" /></div>}
                        {feature.icon === "trending-up" && <div className="w-6 h-6 border-l-2 border-b-2 border-white relative"><div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white transform rotate-45" /></div>}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "category":
        return (
          <div className="min-h-screen py-8 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <Button 
                  variant="glass" 
                  onClick={handleHome}
                  className="group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Home
                </Button>
                <PyQuizLogo size="sm" />
                <div className="w-32" /> {/* Spacer for centering */}
              </div>
              <CategorySelector onSelectCategory={handleSelectCategory} />
            </div>
          </div>
        );

      case "playing":
        if (quiz.isLoading) {
          return (
            <div className="min-h-screen py-8 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center py-20">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h3 className="text-xl font-semibold">Loading Quiz...</h3>
                    <p className="text-muted-foreground">Preparing your questions</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (quiz.error) {
          return (
            <div className="min-h-screen py-8 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center py-20">
                  <div className="text-center space-y-4">
                    <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
                    <h3 className="text-xl font-semibold text-destructive">Failed to Load Quiz</h3>
                    <p className="text-muted-foreground">{quiz.error}</p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={handleHome} variant="outline">
                        Back to Home
                      </Button>
                      <Button onClick={() => quiz.startQuiz(selectedCategory!)}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (!quiz.questions.length) return null;
        
        return (
          <div className="min-h-screen py-8 px-6">
            <div className="max-w-7xl mx-auto">
              <QuizGame
                questions={quiz.questions}
                currentQuestionIndex={quiz.currentQuestionIndex}
                score={quiz.score}
                correctAnswers={quiz.correctAnswers}
                timeLeft={quiz.timeLeft}
                streak={quiz.streak}
                answers={quiz.answers}
                onAnswer={quiz.answerQuestion}
                onComplete={() => setGameState("complete")}
                onHome={handleHome}
              />
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="min-h-screen py-8 px-6">
            <div className="max-w-7xl mx-auto">
              <GameOverScreen
                score={quiz.score}
                totalQuestions={quiz.totalQuestions}
                correctAnswers={quiz.correctAnswers}
                accuracy={quiz.accuracy}
                onRestart={handleRestart}
                onHome={handleHome}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Content */}
      <div className="relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;