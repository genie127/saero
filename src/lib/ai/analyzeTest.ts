// src/lib/ai/analyzeTest.ts

import { generateContent } from './generateContent';

import { createTestAnalysisPrompt } from '@/prompts/testAnalysis.prompt';

type Params = {
    totalScore: number; categoryScores: Record<string, number>; promptTxt:string
};

export const analyzeTest = async ({
    totalScore,
    categoryScores,
    promptTxt
}: Params) => {

    const prompt = createTestAnalysisPrompt({
        totalScore,
        categoryScores,
        promptTxt
    });

    return generateContent(prompt);
};