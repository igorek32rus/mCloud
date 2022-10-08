import React from 'react'
import { LoaderProvider } from './Context'
import { CopyCutPasteContextProvider } from './Context'
import { DirContextProvider } from './Context'


export const GeneralProvider = ({children}) => {
    return (
        <LoaderProvider>
            <DirContextProvider>
                <CopyCutPasteContextProvider>
                    { children }
                </CopyCutPasteContextProvider>
            </DirContextProvider>
        </LoaderProvider>
    )
}

export * from './contexts/ModalContext/ModalContext'
export * from './contexts/ModalContext/ModalContextProvider'

export * from './contexts/LoaderContext/LoaderContext'
export * from './contexts/LoaderContext/LoaderContextProvider'

export * from './contexts/MainMenuContext/MainMenuContext'
export * from './contexts/MainMenuContext/MainMenuContextProvider'

export * from './contexts/CopyCutPasteContext/CopyCutPasteContext'
export * from './contexts/CopyCutPasteContext/CopyCutPasteContextProvider'

export * from './contexts/DirContext/DirContext'
export * from './contexts/DirContext/DirContextProvider'