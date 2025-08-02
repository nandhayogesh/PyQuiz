import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, Home, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/quizData";

interface QuizGameProps {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  timeLeft: number;
  streak: number;
  onAnswer: (answerIndex: number) => void;
  onComplete: () => void;
  onHome: () => void;
  answers: (number | null)[];
}

export const QuizGame = ({ 
  questions, 
  currentQuestionIndex, 
  score, 
  correctAnswers, 
  timeLeft, 
  streak,
  onAnswer, 
  onComplete,
  onHome,
  answers 
}: QuizGameProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0);

  const currentQuestion = reviewMode ? questions[reviewQuestionIndex] : questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = answers[currentQuestionIndex] !== null;

  // Reset states when question changes
  useEffect(() => {
    if (!reviewMode) {
      const wasAnswered = answers[currentQuestionIndex] !== null;
      setIsAnswered(wasAnswered);
      setShowResult(wasAnswered);
      setSelectedAnswer(wasAnswered ? answers[currentQuestionIndex] : null);
    }
  }, [currentQuestionIndex, answers, reviewMode]);

  // Auto-complete quiz when all questions are answered
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && !reviewMode) {
      onComplete();
    }
  }, [currentQuestionIndex, questions.length, onComplete, reviewMode]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered || reviewMode) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);
    
    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 2000);
  };

  const handleReviewMode = () => {
    setReviewMode(true);
    setReviewQuestionIndex(0);
  };

  const handleExitReview = () => {
    setReviewMode(false);
  };

  const handleReviewNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && reviewQuestionIndex > 0) {
      setReviewQuestionIndex(reviewQuestionIndex - 1);
    } else if (direction === 'next' && reviewQuestionIndex < currentQuestionIndex) {
      setReviewQuestionIndex(reviewQuestionIndex + 1);
    }
  };

  const getOptionClassName = (index: number) => {
    const isReviewing = reviewMode;
    const currentAnswer = isReviewing ? answers[reviewQuestionIndex] : selectedAnswer;
    const shouldShowResult = isReviewing || showResult;
    
    if (!shouldShowResult) {
      return "glass-card hover:shadow-neon cursor-pointer transition-all duration-300 hover:scale-[1.02]";
    }
    
    if (index === currentQuestion.correctAnswer) {
      return "glass-card shadow-[0_0_20px_hsl(var(--success)/0.6)] bg-success/20 border-success";
    }
    
    if (index === currentAnswer && index !== currentQuestion.correctAnswer) {
      return "glass-card shadow-[0_0_20px_hsl(var(--destructive)/0.6)] bg-destructive/20 border-destructive";
    }
    
    return "glass-card opacity-50";
  };

  const getQuestionProgress = () => {
    const answered = answers.filter(a => a !== null).length;
    return (answered / questions.length) * 100;
  };

  if (reviewMode) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 animate-slide-up">
        {/* Review Header */}
        <div className="glass-card flex items-center justify-between">
          <Button variant="glass" onClick={handleExitReview} className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Quiz
          </Button>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Review Mode</h2>
            <p className="text-sm text-muted-foreground">
              Question {reviewQuestionIndex + 1} of {currentQuestionIndex + 1}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="glass" 
              size="sm" 
              onClick={() => handleReviewNavigation('prev')}
              disabled={reviewQuestionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="glass" 
              size="sm" 
              onClick={() => handleReviewNavigation('next')}
              disabled={reviewQuestionIndex >= currentQuestionIndex}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Review Question */}
        <div className="glass-card">
          <div className="mb-4 p-3 rounded-xl bg-muted/20 border border-muted">
            <p className="text-sm font-medium">
              Your answer: {answers[reviewQuestionIndex] !== null ? (
                <span className={cn(
                  "ml-2",
                  answers[reviewQuestionIndex] === currentQuestion.correctAnswer ? "text-success" : "text-destructive"
                )}>
                  {currentQuestion.options[answers[reviewQuestionIndex]!]}
                </span>
              ) : (
                <span className="text-muted-foreground ml-2">Not answered</span>
              )}
            </p>
          </div>
          
          <h2 className="text-xl font-semibold mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "w-full p-4 text-left rounded-xl transition-all duration-300",
                  getOptionClassName(index)
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                    index === currentQuestion.correctAnswer && "border-success text-success bg-success/20",
                    index === answers[reviewQuestionIndex] && index !== currentQuestion.correctAnswer && "border-destructive text-destructive bg-destructive/20",
                    index !== currentQuestion.correctAnswer && index !== answers[reviewQuestionIndex] && "border-muted text-muted"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-base">{option}</span>
                  {index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-success ml-auto" />
                  )}
                  {index === answers[reviewQuestionIndex] && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-destructive ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          {currentQuestion.explanation && (
            <div className="mt-6 p-4 rounded-xl bg-muted/20 border border-muted">
              <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-slide-up">
      {/* Progress Header */}
      <div className="glass-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="glass" onClick={onHome} className="group">
            <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Home
          </Button>
          {currentQuestionIndex > 0 && (
            <Button variant="outline" onClick={handleReviewMode} className="group">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Review Answers
            </Button>
          )}
        </div>
        
        <div className="text-center flex-1">
          <div className="text-sm text-muted-foreground mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${getQuestionProgress()}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Score</div>
            <div className="font-bold text-primary">{score.toLocaleString()}</div>
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
      </div>

      {/* Question */}
      <div className="glass-card">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">Difficulty: <span className={cn(
              "font-medium",
              currentQuestion.difficulty === "Easy" && "text-success",
              currentQuestion.difficulty === "Medium" && "text-warning", 
              currentQuestion.difficulty === "Hard" && "text-destructive"
            )}>{currentQuestion.difficulty}</span></span>
            <span className="text-muted-foreground">Points: <span className="font-medium text-primary">{currentQuestion.points}</span></span>
          </div>
          {streak > 0 && (
            <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium animate-pulse-glow">
              🔥 {streak} streak
            </div>
          )}
        </div>
        
        <h2 className="text-xl font-semibold mb-6 leading-relaxed">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
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
                  showResult && index === currentQuestion.correctAnswer && "border-success text-success bg-success/20",
                  showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && "border-destructive text-destructive bg-destructive/20"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base">{option}</span>
                {showResult && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-success ml-auto animate-bounce-in" />
                )}
                {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-destructive ml-auto animate-bounce-in" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showResult && currentQuestion.explanation && (
          <div className="mt-6 p-4 rounded-xl bg-muted/20 border border-muted animate-fade-in-scale">
            <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Auto-advance notification */}
        {showResult && currentQuestionIndex < questions.length - 1 && (
          <div className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">
            Moving to next question...
          </div>
        )}
      </div>
    </div>
  );
};