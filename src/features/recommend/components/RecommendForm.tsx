// RecommendForm.tsx

'use client'

import { useState } from "react";

interface Props{
    onSubmit:(
        schoolStart:string,
        schoolEnd:string,
        homeTime:string
    )=>void
}

export const RecommendForm = ({
    onSubmit
}:Props)=>{

    const [schoolStart,setSchoolStart] =
        useState("");

    const [schoolEnd,setSchoolEnd] =
        useState("");

    const [homeTime,setHomeTime] =
        useState("");

    return(
        <div className="info_sec">
            <div className="input_wrap">
                <label htmlFor="schoolStart">등교</label>
                <input
                    type="time"
                    value={schoolStart}
                    onChange={(e)=>
                        setSchoolStart(
                            e.target.value
                        )
                    }
                />
            </div>
            <div className="input_wrap">
            <label htmlFor="schoolEnd">하교</label>
            <input
                type="time"
                value={schoolEnd}
                onChange={(e)=>
                    setSchoolEnd(
                        e.target.value
                    )
                }
            />

            </div>
            <div className="input_wrap">
            <label htmlFor="homeTime">하교</label>
            <input
                type="time"
                value={homeTime}
                onChange={(e)=>
                    setHomeTime(
                        e.target.value
                    )
                }
            />

            </div>
            <button
            className="btn_submit"
                onClick={()=>
                    onSubmit(
                        schoolStart,
                        schoolEnd,
                        homeTime
                    )
                }
            >
                추천받기
            </button>

        </div>
    )
}