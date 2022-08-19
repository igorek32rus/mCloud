import { createContext } from "react"

export const MainMenuContext = createContext({
    isMenuOpened: false,
    setIsMenuOpened: () => {}
})