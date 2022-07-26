import React, { useContext } from "react";

import './Modal.css'

import { ModalContext } from '../../../Context'

function Modal({title, children}) {
    const {closeModal} = useContext(ModalContext)

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation() }>
                <div className="modal-header">
                    <h1>{title}</h1>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal