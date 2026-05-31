import { generateContent } from './generateContent';
import { createRecommendPrompt } from '@/prompts/Recommend.prompt';

type Params = {
    home: string;
    school: string;
    blankTime: number;
    facilities: any;
};

export const recommendAi = async ({
    home,
    school,
    blankTime,
    facilities
}: Params) => {

    const prompt = createRecommendPrompt({
        home,
        school,
        blankTime,
        facilities
    });

    return generateContent(prompt);
};