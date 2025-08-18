import type { TriviaQuestion, QuizSettings } from './types';

// HTML decode function
export const decodeHtml = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

// Shuffle array function
export const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// API function
export const fetchQuestions = async (settings: QuizSettings): Promise<TriviaQuestion[]> => {
    const { amount, category, difficulty, type } = settings;
    let url = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        return data.results.map((q: any) => ({
            ...q,
            question: decodeHtml(q.question),
            correct_answer: decodeHtml(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map((ans: string) => decodeHtml(ans)),
            all_answers: shuffleArray([
                decodeHtml(q.correct_answer),
                ...q.incorrect_answers.map((ans: string) => decodeHtml(ans))
            ])
        }));
    } else {
        throw new Error('No questions found for these settings');
    }
};

// Score calculation functions
export const getScoreColor = (score: number, total: number): string => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
};

export const getTimeColor = (timeLeft: number): string => {
    if (timeLeft > 10) return 'text-green-600';
    if (timeLeft > 5) return 'text-yellow-600';
    return 'text-red-600';
};