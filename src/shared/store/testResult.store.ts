import { create } from 'zustand';

interface TestResultState {
    totalScore: number;
    categoryScores: Record<string, number>;
    grade: string;

    setResult: (data: {
        totalScore: number;
        categoryScores: Record<string, number>;
        grade: string;
    }) => void;
}

export const useTestResultStore = create<TestResultState>((set) => ({
    totalScore: 0,
    categoryScores: {},
    grade: '',

    setResult: (data) => set(data),
}));