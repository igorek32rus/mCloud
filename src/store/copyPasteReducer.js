const defaultState = {
    mode: "",    // copy || cut
    items: []
}

const SET_MODE = "SET_MODE"
const SET_ITEMS = "SET_ITEMS"

export const copyPasteReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MODE:
            return { ...state, mode: action.payload }
        case SET_ITEMS:
            return { ...state, items: action.payload }
        
        default:
            return state
    }
}

export const copyPasteSetMode = (payload) => ({ type: SET_MODE, payload })
export const copyPasteSetItems = (payload) => ({ type: SET_ITEMS, payload })