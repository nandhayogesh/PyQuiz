import { Trophy, Target, Zap, TrendingUp } from "lucide-react";

interface GameStatsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  accuracy: number;
  level: number;
}

export const GameStats = ({ score, totalQuestions, correctAnswers, streak, accuracy, level }: GameStatsProps) => {
  const stats = [
    {
      icon: Trophy,
      label: "Score",
      value: score.toLocaleString(),
      color: "text-accent",
      gradient: "from-accent to-accent/60",
    },
    {
      icon: Target,
      label: "Correct",
      value: `${correctAnswers}/${totalQuestions}`,
      color: "text-success",
      gradient: "from-success to-success/60",
    },
    {
      icon: Zap,
      label: "Streak",
      value: streak,
      color: "text-primary",
      gradient: "from-primary to-secondary",
    },
    {
      icon: TrendingUp,
      label: "Accuracy",
      value: `${accuracy.toFixed(1)}%`,
      color: "text-secondary",
      gradient: "from-secondary to-accent",
    },
  ];

  return (
    <div className="glass-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-primary">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Game Stats</h3>
          <p className="text-sm text-muted-foreground">Level {level} Player</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="p-4 rounded-xl glass hover:shadow-glow transition-all duration-300 animate-fade-in-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Level Progress */}
      <div className="mt-6 p-4 rounded-xl bg-muted/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Level Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.min(score % 1000, 1000)}/1000 XP
          </span>
        </div>
        <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${Math.min((score % 1000) / 1000 * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};