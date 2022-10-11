import React from 'react'

export const GeneralProvider = ({children}) => {
    return (
        <>
            { children }
        </>
    )
}

export * from './contexts/ModalContext/ModalContext'
export * from './contexts/ModalContext/ModalContextProvider'