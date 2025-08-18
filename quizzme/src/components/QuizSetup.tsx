import React from 'react';
import { Play, Brain } from 'lucide-react';
import type { QuizSettings } from '../types';
import { CATEGORIES, DIFFICULTIES } from '../types';

interface QuizSetupProps {
    settings: QuizSettings;
    onSettingsChange: (settings: QuizSettings) => void;
    onStartQuiz: () => void;
    loading: boolean;
}

const QuizSetup: React.FC<QuizSetupProps> = ({
    settings,
    onSettingsChange,
    onStartQuiz,
    loading
}) => {
    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1578593139939-cccb1e98698c?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-opacity-20 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="text-white w-8 h-8" />
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
                            value={settings.amount}
                            onChange={(e) => onSettingsChange({
                                ...settings,
                                amount: parseInt(e.target.value)
                            })}
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
                            value={settings.category}
                            onChange={(e) => onSettingsChange({
                                ...settings,
                                category: e.target.value
                            })}
                        >
                            {CATEGORIES.map(cat => (
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
                            value={settings.difficulty}
                            onChange={(e) => onSettingsChange({
                                ...settings,
                                difficulty: e.target.value
                            })}
                        >
                            {DIFFICULTIES.map(diff => (
                                <option key={diff.value} value={diff.value}>{diff.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={onStartQuiz}
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
};

export default QuizSetup;