const defaultState = {
    windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

const SET_NEW_WINDOW_SIZE = "SET_NEW_WINDOW_SIZE"

export const windowSizeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_NEW_WINDOW_SIZE:
            return {...state, windowSize: {...state.windowSize, ...action.payload}}

        default:
            return state
    }
}

export const setWindowSize = (payload) => ({type: SET_NEW_WINDOW_SIZE, payload})