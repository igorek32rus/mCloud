import { createContext } from "react"

export const MainMenuContext = createContext({
    isMenuOpened: false,
    isMenuClosing: false,
    setIsMenuClosing: () => {},
    setIsMenuOpened: () => {}
})