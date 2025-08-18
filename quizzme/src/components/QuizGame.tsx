import React from 'react';
import { Trophy, MessageCircleQuestionMark, Clock } from 'lucide-react';
import type { TriviaQuestion } from '../types';
import { getTimeColor } from '../utils';

interface QuizGameProps {
    question: TriviaQuestion;
    questionIndex: number;
    totalQuestions: number;
    score: number;
    timeLeft: number;
    selectedAnswer: string;
    showResult: boolean;
    onAnswerSelect: (answer: string) => void;
}

const QuizGame: React.FC<QuizGameProps> = ({
    question,
    questionIndex,
    totalQuestions,
    score,
    timeLeft,
    selectedAnswer,
    showResult,
    onAnswerSelect
}) => {
    return (
        <div className="min-h-screen relative p-4">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578593139939-cccb1e98698c?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover opacity-20 -z-10"></div>
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Trophy className="text-yellow-500 w-5 h-5" />
                                <span className="font-semibold">Score: {score}/{totalQuestions}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircleQuestionMark className="text-blue-500 w-5 h-5" />
                                <span className="font-semibold">
                                    Question {questionIndex + 1} of {totalQuestions}
                                </span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-2 ${getTimeColor(timeLeft)}`}>
                            <Clock className="w-5 h-5" />
                            <span className="font-bold text-lg">{timeLeft}s</span>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {question.category}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                            {question.question}
                        </h2>
                    </div>

                    <div className="grid gap-3">
                        {question.all_answers.map((answer: string, index: number) => {
                            let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ";

                            if (showResult) {
                                if (answer === question.correct_answer) {
                                    buttonClass += "bg-green-100 border-green-500 text-green-800";
                                } else if (answer === selectedAnswer && answer !== question.correct_answer) {
                                    buttonClass += "bg-red-100 border-red-500 text-red-800";
                                } else {
                                    buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                                }
                            } else {
                                buttonClass += "bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-400 text-gray-800";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => onAnswerSelect(answer)}
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
                                {selectedAnswer === question.correct_answer ?
                                    "🎉 Correct! Well done!" :
                                    `❌ Incorrect. The correct answer was: ${question.correct_answer}`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizGame;