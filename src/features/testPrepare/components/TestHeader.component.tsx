import { TEST_QUESTIONS } from "../constant/testList"

export const TestHeader =({current, total} : {current: number, total:number})=>{

    return(
        <div className="tit_sec">
            <h3 className="tit">우리 아이 준비도 확인하기</h3>
            <p>혼자 등교 시 <br />안전하게 행동할 수 있는지 확인해요.</p>
            <div className="time"><span>약 2분</span> 소요</div>
            <ul className="state">
                {Array.from({ length: total }).map((_, index) => (
                <li
                    key={index}
                    className={current > index ? "active" : ""}
                />
                ))}
            </ul>
        </div> 
    )
}