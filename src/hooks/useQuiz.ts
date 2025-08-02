import { useState, useEffect, useCallback } from "react";
import { Question, apiService, GameSession } from "@/services/api";

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  timeLeft: number;
  isComplete: boolean;
  streak: number;
  answers: (number | null)[];
  sessionId: number | null;
  startTime: number | null;
  isLoading: boolean;
  error: string | null;
}

const QUESTION_TIME_LIMIT = 30; // seconds

export const useQuiz = (categoryId: string | null) => {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    timeLeft: QUESTION_TIME_LIMIT,
    isComplete: false,
    streak: 0,
    answers: [],
    sessionId: null,
    startTime: null,
    isLoading: false,
    error: null,
  });

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize quiz
  const startQuiz = useCallback(async (category: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Get questions from API
      const questions = await apiService.getQuestions(category, 10);
      
      // Create game session
      const session = await apiService.createGameSession(category, questions.length);
      
      setState(prev => ({
        ...prev,
        questions,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        timeLeft: QUESTION_TIME_LIMIT,
        isComplete: false,
        streak: 0,
        answers: new Array(questions.length).fill(null),
        sessionId: session.session_id,
        startTime: Date.now(),
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to start quiz',
      }));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.questions.length > 0 && !state.isComplete && state.timeLeft > 0) {
      const interval = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            // Time's up - move to next question
            const newAnswers = [...prev.answers];
            newAnswers[prev.currentQuestionIndex] = -1; // Mark as timed out
            
            if (prev.currentQuestionIndex >= prev.questions.length - 1) {
              return {
                ...prev,
                timeLeft: 0,
                isComplete: true,
                answers: newAnswers,
                streak: 0, // Reset streak on timeout
              };
            } else {
              return {
                ...prev,
                currentQuestionIndex: prev.currentQuestionIndex + 1,
                timeLeft: QUESTION_TIME_LIMIT,
                answers: newAnswers,
                streak: 0, // Reset streak on timeout
              };
            }
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
  }, [state.currentQuestionIndex, state.questions.length, state.isComplete]);

  // Handle answer selection
  const answerQuestion = useCallback(async (answerIndex: number) => {
    setState(prev => {
      // Don't allow answering if already answered
      if (prev.answers[prev.currentQuestionIndex] !== null) {
        return prev;
      }

      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;
      
      const basePoints = currentQuestion.points;
      const timeBonus = Math.floor((prev.timeLeft / QUESTION_TIME_LIMIT) * 50); // Up to 50 bonus points
      const streakBonus = prev.streak * 10; // 10 points per streak
      
      const questionScore = isCorrect ? basePoints + timeBonus + streakBonus : 0;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      
      // Check if this is the last question
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      
      return {
        ...prev,
        score: prev.score + questionScore,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        timeLeft: isLastQuestion ? 0 : QUESTION_TIME_LIMIT,
        isComplete: isLastQuestion,
        streak: newStreak,
        answers: newAnswers,
      };
    });
  }, []);

  // Save results when quiz is complete
  useEffect(() => {
    if (state.isComplete && state.sessionId && state.startTime) {
      const duration = Math.floor((Date.now() - state.startTime) / 1000);
      const accuracy = state.questions.length > 0 
        ? (state.correctAnswers / state.questions.length) * 100 
        : 0;

      apiService.updateGameSession(state.sessionId, {
        score: state.score,
        correct_answers: state.correctAnswers,
        accuracy,
        duration,
      }).catch(error => {
        console.error('Failed to save game results:', error);
      });
    }
  }, [state.isComplete, state.sessionId, state.startTime, state.score, state.correctAnswers, state.questions.length]);

  // Navigate to specific question (for review mode)
  const goToQuestion = useCallback((questionIndex: number) => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(questionIndex, prev.questions.length - 1)),
      timeLeft: QUESTION_TIME_LIMIT,
    }));
  }, []);

  // Reset quiz
  const resetQuiz = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setState(prev => ({
      ...prev,
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      timeLeft: QUESTION_TIME_LIMIT,
      isComplete: false,
      streak: 0,
      answers: [],
      sessionId: null,
      startTime: null,
      error: null,
    }));
  }, [timerInterval]);

  // Get current question
  const currentQuestion = state.questions[state.currentQuestionIndex];
  
  // Calculate accuracy
  const accuracy = state.questions.length > 0 
    ? (state.correctAnswers / Math.max(state.currentQuestionIndex + (state.isComplete ? 0 : 1), 1)) * 100 
    : 0;

  // Get quiz progress
  const progress = state.questions.length > 0 
    ? ((state.currentQuestionIndex + (state.isComplete ? 1 : 0)) / state.questions.length) * 100 
    : 0;

  return {
    // State
    questions: state.questions,
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    score: state.score,
    correctAnswers: state.correctAnswers,
    timeLeft: state.timeLeft,
    isComplete: state.isComplete,
    streak: state.streak,
    accuracy,
    progress,
    totalQuestions: state.questions.length,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    startQuiz,
    answerQuestion,
    resetQuiz,
    goToQuestion,
    answers: state.answers,
  };
};