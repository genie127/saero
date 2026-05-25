import { ReactNode } from "react"
import { TestQuestionType } from "../type/testQuestion.type"

export const TestQuestion = (
    {
    question,
    img,
    selected,
    onSelect
    }:
    {
        question: TestQuestionType
        img:ReactNode
        selected: number
        onSelect:(value:number)=>void
    }
)=>{
    return(
        <>
            <p>{question.category}</p>
            {img}
            <p>{question.question}</p>
        
            <ul>
                {question.options.map((opts, index)=>{
                    const idx = index + 1;
                   return(
                     <li key={index} className={selected == idx ? 'on': ''}>
                        <button onClick={()=>onSelect(idx)}>
                            <span>{index+1}</span>{opts}
                        </button>
                    </li>
                   )
                })}
            </ul>
        </>
    )
}