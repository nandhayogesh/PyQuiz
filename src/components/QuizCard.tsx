import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  timeLeft: number;
  questionNumber: number;
  totalQuestions: number;
}

export const QuizCard = ({ question, onAnswer, timeLeft, questionNumber, totalQuestions }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);
    
    const isCorrect = answerIndex === question.correctAnswer;
    
    // Add animation delay before calling onAnswer
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 2000);
  };

  const getOptionClassName = (index: number) => {
    if (!showResult) {
      return "glass-card hover:shadow-neon cursor-pointer transition-all duration-300 hover:scale-[1.02]";
    }
    
    if (index === question.correctAnswer) {
      return "glass-card shadow-[0_0_20px_hsl(var(--success)/0.6)] bg-success/20 border-success";
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return "glass-card shadow-[0_0_20px_hsl(var(--destructive)/0.6)] bg-destructive/20 border-destructive animate-[wrongAnswer_0.5s_ease-in-out]";
    }
    
    return "glass-card opacity-50";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-slide-up">
      {/* Progress Header */}
      <div className="glass-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span className={cn(
            "font-mono font-bold",
            timeLeft <= 10 ? "text-destructive animate-pulse" : "text-primary"
          )}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="glass-card">
        <h2 className="text-xl font-semibold mb-6 text-center leading-relaxed">
          {question.question}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={cn(
                "w-full p-4 text-left rounded-xl transition-all duration-300",
                getOptionClassName(index),
                isAnswered ? "cursor-not-allowed" : "hover:shadow-glow"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                  !showResult && "border-primary text-primary",
                  showResult && index === question.correctAnswer && "border-success text-success bg-success/20",
                  showResult && index === selectedAnswer && index !== question.correctAnswer && "border-destructive text-destructive bg-destructive/20"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-success ml-auto animate-bounce-in" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 text-destructive ml-auto animate-bounce-in" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showResult && question.explanation && (
          <div className="mt-6 p-4 rounded-xl bg-muted/20 border border-muted animate-fade-in-scale">
            <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};