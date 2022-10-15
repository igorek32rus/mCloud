import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { closeModal } from "../../../store/modalWindowReducer"

import './Modal.scss'

function Modal() {
    const { modalContent } = useSelector(state => state.modalWindow)
    const dispatch = useDispatch()

    return (
        <div className="modal-backdrop" onClick={() => dispatch(closeModal())}>
            <div className="modal" onClick={(e) => e.stopPropagation() }>
                <div className="modal-header">
                    <h1>{modalContent.title}</h1>
                </div>
                <div className="modal-body">
                    {modalContent.children}
                </div>
            </div>
        </div>
    )
}

export default Modal