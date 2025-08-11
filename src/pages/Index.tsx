import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import CategorySelector from '../components/CategorySelector';
import QuizGame from '../components/QuizGame';
import GameOverScreen from '../components/GameOverScreen';
import ParticleBackground from '../components/ParticleBackground';

const Index: React.FC = () => {
  const {
    gameState,
    currentQuestion,
    score,
    timeLeft,
    selectedCategory,
    gameStats,
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz
  } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {gameState === 'menu' && (
          <CategorySelector onStartQuiz={startQuiz} />
        )}
        
        {gameState === 'playing' && currentQuestion && (
          <QuizGame
            question={currentQuestion}
            score={score}
            timeLeft={timeLeft}
            onSubmitAnswer={submitAnswer}
            onNextQuestion={nextQuestion}
          />
        )}
        
        {gameState === 'gameOver' && (
          <GameOverScreen
            score={score}
            category={selectedCategory}
            stats={gameStats}
            onRestart={resetQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default Index;