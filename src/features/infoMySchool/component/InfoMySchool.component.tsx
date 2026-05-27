'use client'
import { Modal } from "@/shared/components/Modal/component/Modal.component"
import useModal from "@/shared/components/Modal/hooks/useModal.hooks"
import { ReactNode } from "react"
import DOMPurify from 'dompurify'

interface TimeTable{
    PERIO: string
    ITRT_CNTNT:string

}
interface Meal{
    DDISH_NM: string
    NTR_INFO:ReactNode

}
interface Schedule{
    EVENT_NM: string
    NTR_INFO:ReactNode

}

export const InfoMySchool =()=>{
    const {state, action} = useModal();

    
    async function handleOpenTimeTableModal() {

        const res = await fetch(`/api/school/schoolTimetable`);


        const data = await res.json();

        if (!res.ok) {
            throw new Error('시간표 조회 실패')
        }

        action.handleOpenModal({
            children:
                <div>
                    {
                        data.map((item: TimeTable) => (
                            <li key={item.PERIO}>
                                {item.PERIO}교시 -{item.ITRT_CNTNT}
                            </li>
                        ))
                    }
                </div>
        })
    }
    async function handleOpenMealModal() {

        const res = await fetch(`/api/school/schoolMeal`);


        const data = await res.json();

        if (!res.ok) {
            throw new Error('식단표 조회 실패')
        }

        action.handleOpenModal({
            children:
                <div>
                    {
                        data.map((item: Meal, index:number) => (
                            <li key={index}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(item.DDISH_NM)
                                }}
                            />
                        ))
                    }
                </div>
        })
    }
    async function handleOpenSchedule() {

        const res = await fetch(`/api/school/schoolSchedule`);


        const data = await res.json();

        if (!res.ok) {
            throw new Error('일정 조회 실패')
        }

        action.handleOpenModal({
            children:
                <div>
                    {
                        data.map((item: Schedule, index:number) => (
                            <li key={index}
                            >
                                {item.EVENT_NM}
                                </li>
                        ))
                    }
                </div>
        })
    }
    return(
        <>
            <ul>
                <li>
                    <button onClick={()=>handleOpenTimeTableModal()}>수업시간표</button>
                </li>
                <li>
                    <button onClick={()=>handleOpenMealModal()}>오늘의 식단표</button>
                </li>
                <li>
                    <button onClick={()=>handleOpenSchedule()}>학사일정 확인</button>
                </li>
            </ul>
            <Modal
                openModal={state.openModal}
                onClose={()=>action.handleCloseModal()}
            >
                {state.modalCon}
            </Modal>
        </>
    )
}