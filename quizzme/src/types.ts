export interface TriviaQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[];
}

export interface QuizSettings {
    amount: number;
    category: string;
    difficulty: string;
    type: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Difficulty {
    value: string;
    label: string;
}

export type GameState = 'setup' | 'playing' | 'finished';

// Constants
export const CATEGORIES: Category[] = [
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

export const DIFFICULTIES: Difficulty[] = [
    { value: '', label: 'Any Difficulty' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
];