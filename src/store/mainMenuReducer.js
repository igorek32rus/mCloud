const defaultState = {
    opened: false,
    closing: false
}

const SET_OPENED = "SET_OPENED"
const SET_CLOSING = "SET_CLOSING"

export const mainMenuReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_OPENED:
            return {...state, opened: action.payload}
        case SET_CLOSING:
            return {...state, closing: action.payload}

        default:
            return state
    }
}

export const setMenuOpened = (payload) => ({type: SET_OPENED, payload})
export const setMenuClosing = (payload) => ({type: SET_CLOSING, payload})