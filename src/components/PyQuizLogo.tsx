import { Brain, Zap } from "lucide-react";

export const PyQuizLogo = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const isLarge = size === "lg";
  
  return (
    <div className={`flex items-center gap-3 ${isLarge ? "text-4xl" : "text-2xl"}`}>
      <div className="relative">
        <div className={`p-3 glass rounded-2xl ${isLarge ? "p-4" : "p-2"}`}>
          <Brain className={`${isLarge ? "w-8 h-8" : "w-6 h-6"} text-primary animate-pulse-glow`} />
        </div>
        <Zap className={`absolute -top-1 -right-1 ${isLarge ? "w-4 h-4" : "w-3 h-3"} text-accent animate-bounce`} />
      </div>
      <div>
        <h1 className={`font-bold bg-gradient-primary bg-clip-text text-transparent ${isLarge ? "text-5xl" : "text-3xl"}`}>
          PyQuiz
        </h1>
        <p className={`text-muted-foreground ${isLarge ? "text-lg" : "text-sm"} -mt-1`}>
          Level Up Your Knowledge
        </p>
      </div>
    </div>
  );
};