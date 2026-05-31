'use client'
import Link from 'next/link';
import './coachingAi.scss'
import { useCoachingAi } from "./hooks/useCoachingAi.hooks";

export const CoachingAi=( {address} :{address:string})=>{

    const {state} = useCoachingAi(address);
    
    return(
        <div className='coacingAi'>

        <div className="tit_sec">
                <h3>오늘의 AI 코칭</h3>
           </div>
            <div className="weather">
                <h3>오늘의 날씨는</h3>
                {
                    state.loading
                        ? <p>AI가 결과 분석 중...</p>
                        : <pre>{state.analysisWeather}</pre>
                }
            </div>
            <div className="safePoint">
                <h3>안전수칙을 지켜요</h3>
                {
                    state.loading
                        ? <p>AI가 결과 분석 중...</p>
                        : <pre>{state.analysisSafePoint}</pre>
                }
            </div>

            <Link href={'/dashboard'} className='btn_next'>메인화면으로</Link>

        </div>
    )
}