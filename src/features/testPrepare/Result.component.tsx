'use client'

import { useEffect, useState } from 'react';
import { useTestResultStore } from '@/shared/store/testResult.store';

export default function Result() {

    const {
        totalScore,
        categoryScores,
        grade,
    } = useTestResultStore();

    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalysis = async () => {

            try {

                const res = await fetch('/api/ai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        totalScore,
                        categoryScores,
                    }),
                });

                const data = await res.json();

                setAnalysis(data.text);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchAnalysis();

    }, [totalScore, categoryScores]);

    const gradeTxt = (grade: string) => {
        return (
            grade == 'safe' ? '혼자서도 씩씩하게 잘 가요!' :
            grade == 'warn' ? '혼자일 땐 조금 더 조심해요!' :
            grade == 'boundary' ? '세이로와 안전 연습이 필요해요!' :
            '지금은 부모님와 함께 든든하게!'
        )
    }

    return (

        <div>
            <h1>우리 아이 준비도 결과</h1>

            <p>
                <span className={grade}>
                    {totalScore}
                </span>
                점
            </p>

            <p>{gradeTxt(grade)}</p>

            {
                loading
                    ? <p>AI가 결과 분석 중...</p>
                    : <pre>{analysis}</pre>
            }

            <button></button>

        </div>
    );
}