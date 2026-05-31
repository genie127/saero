// RecommendResult.tsx

interface Props{
    result:any;
}

export const RecommendResult = ({
    result
}:Props)=>{

    if(!result) return null;

    return(
        <div className="coaching">
            {
                result}
        </div>
    )
}