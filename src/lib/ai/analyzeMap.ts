// src/lib/ai/analyzeTest.ts

import { generateContent } from './generateContent';

import { createMapAnalysisPrompt } from '@/prompts/MapAnalysis.prompt';

type Params = {
    accidentCount:number
    cctvCount:number
    illegalParkingCount:number
};

export const analyzeMap = async ({
    accidentCount,
    cctvCount,
    illegalParkingCount,
}: Params) => {

    const prompt = createMapAnalysisPrompt({
        accidentCount,
        cctvCount,
        illegalParkingCount,
    });

    return generateContent(prompt);
};