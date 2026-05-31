// src/app/api/gemini/route.ts

import { recommendAi } from '@/lib/ai/recommendAi';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const text = await recommendAi(body);

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