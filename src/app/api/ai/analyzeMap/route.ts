// src/app/api/gemini/route.ts

import { NextResponse } from 'next/server';

import { analyzeMap } from '@/lib/ai/analyzeMap';

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const text = await analyzeMap(body);

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