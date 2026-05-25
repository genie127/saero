// src/app/api/gemini/route.ts

import { NextResponse } from 'next/server';

import { analyzeTest } from '@/lib/ai/analyzeTest';

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const text = await analyzeTest(body);

        return NextResponse.json({
            text,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: 'AI 분석 실패',
            },
            
            {
                status: 500,
            }
        );

    }

}