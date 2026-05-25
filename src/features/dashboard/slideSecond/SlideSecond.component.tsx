import Image from "next/image"

export const SlideSecond = ()=>{
    return(
        <div className="wrap_slide">
            <div className="tit">
                <p>생활 · 설계</p>
                <h2>세이로 일정 매니저</h2>
            </div>
            <Image
                src={'/images/dashboard/sl02_img.png'}
                width={257}
                height={236}
                alt={'슬라이드이미지02'}
            />
            <p>
                매일 달라지는 하교·학원·돌봄 시간 사이 빈틈,
                <br/>AI 비서로봇 세이로가 가장 안전하고 효율적인 
                <br/>일정을 만들어드려요
            </p>
            <button>AI 맞춤 일정 추천받기</button>
        </div>
    )
}