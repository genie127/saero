'use client'

import { useRouter } from 'next/navigation'
import styles from './Main.module.scss'

export const Main =()=>{
    const {replace} = useRouter();
    const handleNext =()=>{
        replace('/create-account')
    }

    return(
        <div className={styles.main}>
            <h1 className={styles.tit}>
                <em className="f_tit">세이로</em>
                초등학교 입학 길잡이
            </h1>
            <div className={`${styles.txt_wrap}`}>
                <p className={styles.txt}>
                    우리 아이 초등학교 첫 시작<br />
                    <span>AI 길잡이 <em>세이로</em></span>가 함께해요
                </p>
                <button onClick={()=>handleNext()} className={styles.go_next}>
                    세이로와 안전하게 등교하기 &gt;
                </button>
            </div>
        </div>
    )
}