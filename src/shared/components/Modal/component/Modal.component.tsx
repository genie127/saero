import { ReactNode } from "react"
import useModal from "../hooks/useModal.hooks"
import './Modal.scss'

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
            
            <div className="modal_con">
               <div className="child">

                 {children}
               </div>
            <button 
                onClick={onClose} 
                    className="modal_overlay"
            >
                닫기
            </button>
            </div>
        </div>
    )
}