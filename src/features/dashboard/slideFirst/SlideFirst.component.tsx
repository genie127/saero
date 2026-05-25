import Image from "next/image"
import Link from "next/link"

export const SlideFirst = ()=>{

    return(
        <div className="wrap_slide">
            <div className="tit">
                <p>자립 · 안전</p>
                <h2>세이로 보행 코치</h2>
            </div>
            <Image
                src={'/images/dashboard/sl01_img.png'}
                width={257}
                height={236}
                alt={'슬라이드이미지01'}
            />
            <p>
                AI 안전지킴이 세이로가 아이 눈높이로 분석한 
                <br/>등굣길 위험요소를 확인하고,
                <br/>진단을 통해 맞춤 교통안전 미션을 수행해보세요
            </p>
            <Link href={'/find-danger'}>110cm 위험 요소 확인하기</Link>
        </div>
    )
}