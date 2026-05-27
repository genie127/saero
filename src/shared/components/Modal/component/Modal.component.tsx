import { ReactNode } from "react"
import useModal from "../hooks/useModal.hooks"

interface ModalType {
    openModal: boolean
    children: ReactNode
    onClose: ()=>void
}

export const Modal =({openModal,onClose, children}:ModalType)=>{
    const {state, action} = useModal();
    
    if (!openModal) return null;

    return(
        <div className="modal">
            <button 
                onClick={onClose} 
                    className="modal_overlay"
            >
                button
                </button>
            <div className="modal_con">
                {children}
            </div>
        </div>
    )
}