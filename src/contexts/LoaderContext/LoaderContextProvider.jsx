import React, {useState} from "react"
import { LoaderContext } from "./LoaderContext"

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    const valueLoaderProvider = { loading, setLoading }

    return (
        <LoaderContext.Provider value={valueLoaderProvider}>
            { children }
        </LoaderContext.Provider>
    )
}