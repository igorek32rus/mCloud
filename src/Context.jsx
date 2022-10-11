import React from 'react'
// import { LoaderProvider } from './Context'


export const GeneralProvider = ({children}) => {
    return (
        <>
            { children }
        </>
    )
}

export * from './contexts/ModalContext/ModalContext'
export * from './contexts/ModalContext/ModalContextProvider'

// export * from './contexts/LoaderContext/LoaderContext'
// export * from './contexts/LoaderContext/LoaderContextProvider'

export * from './contexts/MainMenuContext/MainMenuContext'
export * from './contexts/MainMenuContext/MainMenuContextProvider'