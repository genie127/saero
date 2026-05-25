import Link from "next/link"

export const FindDanger=()=>{
    return(
        <div className="findDanger">
            <h2>110cm 위험요소 확인하기</h2>
            <p>AI로봇 세이로가 집→학교 등굣길을
                <br />우리 아이 눈높이 110cm 시점으로 
                <br />분석해 맞춤 안전 코칭을 제공해요.
            </p>
            <p>오늘은 무엇을 확인할까요?</p>

            <ul>
                <li>
                    <Link href={'/find-danger/test-prepare'}>
                        <p>우리 아이 준비도 확인하기</p>
                        <span>집→학교 우리 아이가 안전하게 다닐 수 있는지 진단해요.</span>
                    </Link>
                </li>
                <li>
                    <Link href={'/find-danger/search-load'}>
                        <p>등굣길 위험요소 살펴보기</p>
                        <span>우리 아이 눈높이 110cm 시점에서 위험요소를 확인해요.</span>
                    </Link>
                </li>
                <li>
                    <Link href={'/find-danger/coaching-ai'}>
                        <p>오늘의 AI 맞춤 코칭 </p>
                        <span>우리 아이에게 지금 꼭 필요한 안전 수칙을 알려줘요.</span>
                    </Link>
                </li> 
            </ul>
        </div>
    )
}