import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Code, Database, Globe, Cpu, BookOpen, Star, Brain, Zap } from "lucide-react";
import { quizCategories } from "@/data/quizData";
import { useState, useEffect } from "react";

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  const [highScores, setHighScores] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load high scores from localStorage
    const savedScores = localStorage.getItem('pyquiz-category-scores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, any> = {
      python: Code,
      'python-intermediate': Brain,
      'python-hard': Zap,
      algorithms: Cpu,
      webdev: Globe,
      database: Database,
      general: BookOpen
    };
    return icons[categoryId] || Code;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in-scale">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-gradient-primary shadow-glow animate-pulse-glow">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          PyQuiz
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master Python programming with our comprehensive quiz platform. 
          Choose your skill level and challenge yourself!
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizCategories.map((category, index) => {
          const Icon = getCategoryIcon(category.id);
          const highScore = highScores[category.id] || 0;
          
          return (
            <Card 
              key={category.id}
              className="glass-card p-6 cursor-pointer group hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectCategory(category.id)}
            >
              <div className="space-y-4">
                {/* Category Icon */}
                <div className="flex justify-center">
                  <div className="p-3 rounded-xl bg-gradient-glass group-hover:shadow-glow transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Category Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">
                      {category.questions.length} questions
                    </span>
                    <span className="text-muted-foreground">
                      {category.difficulty}
                    </span>
                  </div>
                </div>

                {/* High Score */}
                {highScore > 0 && (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-accent font-medium">
                      Best: {highScore.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Start Button */}
                <Button 
                  variant="gaming" 
                  className="w-full group-hover:shadow-neon-glow transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(category.id);
                  }}
                >
                  Start Quiz
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold">Real-time Scoring</h4>
          <p className="text-sm text-muted-foreground">Get instant feedback with dynamic point system</p>
        </div>
        
        <div className="glass-card p-4 text-center">
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-semibold">Progressive Difficulty</h4>
          <p className="text-sm text-muted-foreground">Questions from beginner to expert level</p>
        </div>
        
        <div className="glass-card p-4 text-center">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-semibold">Detailed Analytics</h4>
          <p className="text-sm text-muted-foreground">Track your performance and improvement</p>
        </div>
      </div>
    </div>
  );
};