'use client'
import './result.scss';
import { useEffect, useState } from 'react';
import { useTestResultStore } from '@/shared/store/testResult.store';
import Link from 'next/link';

export default function Result() {

    const {
        totalScore,
        categoryScores,
        grade,
    } = useTestResultStore();

    const promptTxt = '위 데이터를 기반으로 분석해주세요. 200자 내외로 작성해주세요'

    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalysis = async () => {

            try {

                const res = await fetch('/api/ai/analyzeTestApi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        totalScore,
                        categoryScores,
                        promptTxt
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

        <div className='result'>
           <div className="tit_sec">
                <h3>우리 아이 준비도 결과</h3>

                <p className='total'>
                    <span className={grade}>
                        {totalScore}
                    </span>
                    점
                </p>

                <p className='grade'>{gradeTxt(grade)}</p>
           </div>


            <div className="coaching">
                <h4>안전지킴이 세이로의 코칭</h4>
                <p>
                        {
                            loading
                                ? <p>AI가 결과 분석 중...</p>
                                : <pre>{analysis}</pre>
                        }
                </p>

            </div>

            <Link href={'/find-danger/coaching-ai'} className='btn_next'>오늘의 AI 코칭 알아보기</Link>

        </div>
    );
}