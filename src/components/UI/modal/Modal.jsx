import React, { useContext } from "react";

import './Modal.css'

import { ModalContext } from '../../../Context'

function Modal(props) {
    const modal = useContext(ModalContext)

    return (
        <div className="modal" onClick={() => modal.setModal(false)}>
            <div className="modal_window" onClick={(e) => e.stopPropagation() }>
                {props.children}
            </div>
        </div>
    )
}

export default Modal