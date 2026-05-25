// src/lib/ai/analyzeTest.ts

import { generateContent } from './generateContent';

import { createTestAnalysisPrompt } from '@/prompts/testAnalysis.prompt';

type Params = {
    totalScore: number;
    categoryScores: Record<string, number>;
};

export const analyzeTest = async ({
    totalScore,
    categoryScores,
}: Params) => {

    const prompt = createTestAnalysisPrompt({
        totalScore,
        categoryScores,
    });

    return generateContent(prompt);
};