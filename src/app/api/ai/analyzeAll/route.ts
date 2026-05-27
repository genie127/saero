import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {

    try {

        const body = await req.json();

        const {
            address,
            totalScore,
            categoryScores,
        } = body;

        const prompt = `
        당신은 어린이 보행안전 코치입니다.

        [사용자 정보]
        주소: ${address}

        총점: ${totalScore}

        영역별 점수:
        ${JSON.stringify(categoryScores)}

        아래 형식의 JSON으로만 응답하세요.

        {
          "weatherAnalysis": "날씨/지역 기반 위험요소 설명",
          "safeAnalysis": "아이가 지켜야할 안전수칙 3가지"
        }

        조건:
        - weatherAnalysis는 100자 이내
        - safeAnalysis는 번호 포함 3줄
        - 절대 markdown 사용 금지
        - JSON 외 텍스트 금지
        `;

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = result.text ?? '';

        const parsed = JSON.parse(text);

        return NextResponse.json(parsed);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error: 'AI 분석 실패',
            },
            {
                status: 500,
            }
        );

    }

}