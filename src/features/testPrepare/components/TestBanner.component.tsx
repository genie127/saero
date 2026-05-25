import Image from "next/image";

export const TestBanner =({step}:{step:number})=>{

    let img = 
    step > 12 ? '/images/test/img05.png' :
    step <= 12 && step > 9 ? '/images/test/img04.png' :
    step <= 9 && step > 6 ? '/images/test/img03.png' :
    step <= 6 && step > 3 ? '/images/test/img02.png' :
    '/images/test/img01.png';
    
    return(
        <div className="banner">
            <Image
                src={img}
                alt={`배너이미지 ${step}`}
                width={570}
                height={342}
            />
        </div>
    )
}