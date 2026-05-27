import { ReactNode, useState } from "react"

export default function useModal(){
    const [openModal, setOpenModal] = useState(false);
    const [modalCon, setModalCon] = useState<ReactNode>(null);

    const handleOpenModal =({children}:{children:ReactNode})=>{
        setOpenModal(true)
        setModalCon(children)
    }
    const handleCloseModal =()=>{
        console.log('클릭')
        setOpenModal(false)
        
    }


    return({
        state:{
            modalCon,
            openModal
        },
        action:{
            handleOpenModal,
            handleCloseModal
        },
    })
}