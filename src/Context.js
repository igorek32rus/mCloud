import React from "react"

export * from './contexts/ModalContext/ModalContext'
export * from './contexts/ModalContext/ModalContextProvider'

export const AuthContext = React.createContext(false);
export const RegistrationContext = React.createContext('reg');
export const NotifyContext = React.createContext([]);
export const LoaderContext = React.createContext(false);