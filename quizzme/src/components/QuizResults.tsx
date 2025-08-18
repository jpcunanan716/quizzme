import React from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import { getScoreColor } from '../utils';

interface QuizResultsProps {
    score: number;
    totalQuestions: number;
    onPlayAgain: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
    score,
    totalQuestions,
    onPlayAgain
}) => {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578593139939-cccb1e98698c?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover opacity-20 -z-10"></div>
            <div className="absolute inset-0 -z-5"></div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center relative z-10">
                <div className="mb-6">
                    <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="text-white w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
                    <p className="text-gray-600">Here's how you performed</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className={`text-6xl font-bold ${getScoreColor(score, totalQuestions)} mb-2`}>
                        {score}/{totalQuestions}
                    </div>
                    <div className={`text-2xl font-semibold ${getScoreColor(score, totalQuestions)} mb-2`}>
                        {percentage}%
                    </div>
                    <p className="text-gray-600">
                        {percentage >= 80 ? "Excellent! 🌟" :
                            percentage >= 60 ? "Good job! 👍" :
                                "Keep practicing! 💪"}
                    </p>
                </div>

                <button
                    onClick={onPlayAgain}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" />
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default QuizResults;