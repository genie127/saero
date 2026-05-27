'use client'

import { useCoachingAi } from "./hooks/useCoachingAi.hooks";

export const CoachingAi=( {address} :{address:string})=>{

    const {state} = useCoachingAi(address);
    
    return(
        <>
            <div className="weather">
                {
                    state.loading
                        ? <p>AI가 결과 분석 중...</p>
                        : <pre>{state.analysisWeather}</pre>
                }
            </div>
            <div className="safePoint">
                {
                    state.loading
                        ? <p>AI가 결과 분석 중...</p>
                        : <pre>{state.analysisSafePoint}</pre>
                }
            </div>
        </>
    )
}