import React from 'react'
import { AuthProvider } from './Context'
import { NotifyProvider } from './Context'
import { LoaderProvider } from './Context'

export const GeneralProvider = ({children}) => {
    return (
        <AuthProvider>
            <NotifyProvider>
                <LoaderProvider>
                    { children }
                </LoaderProvider>
            </NotifyProvider>
        </AuthProvider>
    )
}

export * from './contexts/ModalContext/ModalContext'
export * from './contexts/ModalContext/ModalContextProvider'

export * from './contexts/AuthContext/AuthContext'
export * from './contexts/AuthContext/AuthContextProvider'

export * from './contexts/NotifyContext/NotifyContext'
export * from './contexts/NotifyContext/NotifyContextProvider'

export * from './contexts/LoaderContext/LoaderContext'
export * from './contexts/LoaderContext/LoaderContextProvider'

export * from './contexts/MainMenuContext/MainMenuContext'
export * from './contexts/MainMenuContext/MainMenuContextProvider'