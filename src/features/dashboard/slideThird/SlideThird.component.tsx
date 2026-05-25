import Image from "next/image"

export const SlideThird = ()=>{
    return(
        <div className="wrap_slide">
            <div className="tit">
                <p>학업 · 연결</p>
                <h2>세이로 학교 알리미</h2>
            </div>
            <Image
                src={'/images/dashboard/sl03_img.png'}
                width={257}
                height={236}
                alt={'슬라이드이미지03'}
            />
            <p>
                AI 학교 알리미 세이로가
                <br/>학사일정, 시간표, 급식 정보를 한눈에 확인하고,
                <br/>필요한 학교 정보를 쉽게 확인해보세요
            </p>
            <button>우리 학교 정보 확인하기</button>
        </div>
    )
}