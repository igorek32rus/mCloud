import { setMenuOpened, setMenuClosing } from "../mainMenuReducer"

export const asyncCloseMenu = () => {
    return dispatch => {
        dispatch(setMenuClosing(true))
        setTimeout(() => {
            dispatch(setMenuOpened(false))
            dispatch(setMenuClosing(false))
        }, 200);
    }
}