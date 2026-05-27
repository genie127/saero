// src/lib/ai/analyzeTest.ts

import { generateContent } from './generateContent';

import { createWeatherAnalysisPrompt } from '@/prompts/weatherAnalysisprompt';

type Params = {
    address: string;
};

export const analyzeWeather = async ({
    address
}: Params) => {

    const prompt = createWeatherAnalysisPrompt({
        address
    });

    return generateContent(prompt);
};