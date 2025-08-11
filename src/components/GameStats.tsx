import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Zap, TrendingUp, Award, Star } from "lucide-react";

interface GameStatsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  accuracy: number;
  level: number;
}

export const GameStats = ({
  score,
  totalQuestions,
  correctAnswers,
  streak,
  accuracy,
  level
}: GameStatsProps) => {
  const progressToNextLevel = (score % 1000) / 10;

  return (
    <Card className="glass-card space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Game Statistics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
          <div className="text-2xl font-bold text-primary">{correctAnswers}</div>
          <div className="text-sm text-muted-foreground">Correct</div>
        </div>
        
        <div className="p-3 rounded-xl bg-destructive/20 border border-destructive/30">
          <div className="text-2xl font-bold text-destructive">{totalQuestions - correctAnswers}</div>
          <div className="text-sm text-muted-foreground">Incorrect</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="text-sm">Accuracy</span>
          </div>
          <span className="font-bold">{accuracy.toFixed(1)}%</span>
        </div>
        <Progress value={accuracy} className="h-2" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Best Streak</span>
          </div>
          <span className="font-bold">{streak}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span className="text-sm">Level {level}</span>
          </div>
          <span className="font-bold">{progressToNextLevel.toFixed(0)}%</span>
        </div>
        <Progress value={progressToNextLevel} className="h-2" />
      </div>
    </Card>
  );
};