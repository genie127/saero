// src/lib/ai/generateContent.ts

import { ai } from '@/lib/gemini';

export const generateContent = async (prompt: string) => {

    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return result.text;
};