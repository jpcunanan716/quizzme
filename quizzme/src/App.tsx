import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, Clock, Target } from 'lucide-react';

// Type definitions
interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

interface QuizSettings {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

interface Category {
  id: string;
  name: string;
}

interface Difficulty {
  value: string;
  label: string;
}

interface ApiResponse {
  response_code: number;
  results: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

type GameState = 'setup' | 'playing' | 'finished';

const TriviaQuizApp: React.FC = () => {
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

  const categories: Category[] = [
    { id: '', name: 'Any Category' },
    { id: '9', name: 'General Knowledge' },
    { id: '21', name: 'Sports' },
    { id: '23', name: 'History' },
    { id: '22', name: 'Geography' },
    { id: '17', name: 'Science & Nature' },
    { id: '18', name: 'Computers' },
    { id: '11', name: 'Movies' },
    { id: '12', name: 'Music' }
  ];

  const difficulties: Difficulty[] = [
    { value: '', label: 'Any Difficulty' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && !showResult) {
      handleAnswer('');
    }
  }, [timeLeft, gameState, showResult]);

  const fetchQuestions = async (): Promise<void> => {
    setLoading(true);
    try {
      const { amount, category, difficulty, type } = quizSettings;
      let url: string = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;

      const response: Response = await fetch(url);
      const data: ApiResponse = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedQuestions: TriviaQuestion[] = data.results.map(q => ({
          ...q,
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(ans => decodeHtml(ans)),
          all_answers: shuffleArray([
            decodeHtml(q.correct_answer),
            ...q.incorrect_answers.map(ans => decodeHtml(ans))
          ])
        }));
        setQuestions(formattedQuestions);
        setGameState('playing');
        setTimeLeft(15);
      } else {
        alert('No questions found for these settings. Try different options.');
      }
    } catch (error: unknown) {
      console.error('Error fetching questions:', error);
      alert('Failed to fetch questions. Please try again.');
    }
    setLoading(false);
  };

  const decodeHtml = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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

  const getScoreColor = (): string => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTimeColor = (): string => {
    if (timeLeft > 10) return 'text-green-600';
    if (timeLeft > 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSettingsChange = (field: keyof QuizSettings, value: string | number): void => {
    setQuizSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Trivia Quiz</h1>
            <p className="text-gray-600">Test your knowledge across various topics</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={quizSettings.amount}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSettingsChange('amount', parseInt(e.target.value))
                }
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={quizSettings.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSettingsChange('category', e.target.value)
                }
              >
                {categories.map((cat: Category) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={quizSettings.difficulty}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSettingsChange('difficulty', e.target.value)
                }
              >
                {difficulties.map((diff: Difficulty) => (
                  <option key={diff.value} value={diff.value}>{diff.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchQuestions}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const currentQuestion: TriviaQuestion = questions[currentQuestionIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-500 w-5 h-5" />
                  <span className="font-semibold">Score: {score}/{questions.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="text-blue-500 w-5 h-5" />
                  <span className="font-semibold">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-2 ${getTimeColor()}`}>
                <Clock className="w-5 h-5" />
                <span className="font-bold text-lg">{timeLeft}s</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="grid gap-3">
              {currentQuestion.all_answers.map((answer: string, index: number) => {
                let buttonClass: string = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ";

                if (showResult) {
                  if (answer === currentQuestion.correct_answer) {
                    buttonClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (answer === selectedAnswer && answer !== currentQuestion.correct_answer) {
                    buttonClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                  }
                } else {
                  buttonClass += "bg-gray-50 border-gray-300 hover:bg-purple-50 hover:border-purple-400 text-gray-800";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <span className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-white border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {answer}
                    </span>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  {selectedAnswer === currentQuestion.correct_answer ?
                    "🎉 Correct! Well done!" :
                    `❌ Incorrect. The correct answer was: ${currentQuestion.correct_answer}`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage: number = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-white w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">Here's how you performed</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{questions.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor()} mb-2`}>
              {percentage}%
            </div>
            <p className="text-gray-600">
              {percentage >= 80 ? "Excellent! 🌟" :
                percentage >= 60 ? "Good job! 👍" :
                  "Keep practicing! 💪"}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TriviaQuizApp;