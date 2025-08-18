import React, { useState, useEffect } from 'react';
import type { GameState, QuizSettings, TriviaQuestion } from './types';
import { fetchQuestions } from './utils';
import QuizSetup from './components/QuizSetup';
import QuizGame from './components/QuizGame';
import QuizResults from './components/QuizResults';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(false);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    amount: 10,
    category: '',
    difficulty: '',
    type: 'multiple'
  });

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && !showResult) {
      handleAnswer('');
    }
  }, [timeLeft, gameState, showResult]);

  const startQuiz = async (): Promise<void> => {
    setLoading(true);
    try {
      const fetchedQuestions = await fetchQuestions(quizSettings);
      setQuestions(fetchedQuestions);
      setGameState('playing');
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer('');
      setShowResult(false);
      setTimeLeft(15);
    } catch (error) {
      alert('Failed to fetch questions. Please try again.');
    }
    setLoading(false);
  };

  const handleAnswer = (answer: string): void => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setShowResult(false);
        setTimeLeft(15);
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const resetQuiz = (): void => {
    setGameState('setup');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
    setTimeLeft(15);
  };

  // Render based on game state
  if (gameState === 'setup') {
    return (
      <QuizSetup
        settings={quizSettings}
        onSettingsChange={setQuizSettings}
        onStartQuiz={startQuiz}
        loading={loading}
      />
    );
  }

  if (gameState === 'playing') {
    return (
      <QuizGame
        question={questions[currentQuestionIndex]}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        score={score}
        timeLeft={timeLeft}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        onAnswerSelect={handleAnswer}
      />
    );
  }

  if (gameState === 'finished') {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        onPlayAgain={resetQuiz}
      />
    );
  }

  return null;
};

export default App;