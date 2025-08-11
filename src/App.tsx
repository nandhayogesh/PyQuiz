import { useState, useEffect, useCallback } from 'react';
import { QuizGame } from '@/components/QuizGame';
import { GameOverScreen } from '@/components/GameOverScreen';
import { CategorySelector } from '@/components/CategorySelector';
import { quizCategories, Question } from '@/data/quizData';
import { Toaster } from '@/components/ui/sonner';

type GameState = 'menu' | 'playing' | 'gameOver';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      // Auto-submit when time runs out
      handleAnswer(-1); // -1 indicates timeout
    }
  }, [timeLeft, gameState]);

  // Set document title dynamically
  useEffect(() => {
    document.title = gameState === 'menu' 
      ? 'PyQuiz - Python Programming Quiz Platform'
      : gameState === 'playing' 
      ? `PyQuiz - Question ${currentQuestionIndex + 1}/${questions.length}`
      : 'PyQuiz - Results';
  }, [gameState, currentQuestionIndex, questions.length]);

  const startQuiz = useCallback((categoryId: string) => {
    const category = quizCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    setSelectedCategory(categoryId);
    setQuestions(category.questions);
    setAnswers(new Array(category.questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setStreak(0);
    setTimeLeft(30);
    setGameState('playing');
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (currentQuestionIndex >= questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const isTimeout = answerIndex === -1;

    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = isTimeout ? null : answerIndex;
    setAnswers(newAnswers);

    if (isCorrect) {
      const basePoints = currentQuestion.points;
      const timeBonus = Math.floor(timeLeft * 2);
      const streakBonus = streak * 50;
      const totalPoints = basePoints + timeBonus + streakBonus;
      
      setScore(prev => prev + totalPoints);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Move to next question or end game
    if (currentQuestionIndex + 1 >= questions.length) {
      setGameState('gameOver');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(30); // Reset timer for next question
    }
  }, [currentQuestionIndex, questions, timeLeft, streak, correctAnswers, answers]);

  const handleComplete = useCallback(() => {
    setGameState('gameOver');
  }, []);

  const handleRestart = useCallback(() => {
    if (selectedCategory) {
      startQuiz(selectedCategory);
    }
  }, [selectedCategory, startQuiz]);

  const handleHome = useCallback(() => {
    setGameState('menu');
    setSelectedCategory('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setStreak(0);
    setAnswers([]);
  }, []);

  const accuracy = questions.length > 0 ? (correctAnswers / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background particles */}
      <div className="particles-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {gameState === 'menu' && (
          <CategorySelector onSelectCategory={startQuiz} />
        )}

        {gameState === 'playing' && (
          <QuizGame
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            score={score}
            correctAnswers={correctAnswers}
            timeLeft={timeLeft}
            streak={streak}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
            onHome={handleHome}
            answers={answers}
          />
        )}

        {gameState === 'gameOver' && (
          <GameOverScreen
            score={score}
            totalQuestions={questions.length}
            correctAnswers={correctAnswers}
            accuracy={accuracy}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default App;

