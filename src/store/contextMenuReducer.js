const defaultState = {
    isContextMenuOpened: false,
    typeContextMenu: "item",
    positionContextMenu: {
        top: 0,
        left: 0
    }
}

const SET_IS_CONTEXT_MENU_OPENED = "SET_IS_CONTEXT_MENU_OPENED"
const SET_TYPE_CONTEXT_MENU = "SET_TYPE_CONTEXT_MENU"
const SET_POSITION_CONTEXT_MENU = "SET_POSITION_CONTEXT_MENU"

export const contextMenuReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_CONTEXT_MENU_OPENED:
            return {...state, isContextMenuOpened: action.payload}
        case SET_TYPE_CONTEXT_MENU:
            return {...state, typeContextMenu: action.payload}
        case SET_POSITION_CONTEXT_MENU:
            return {...state, positionContextMenu: {...action.payload}}

        default:
            return state
    }
}

export const setIsContextMenuOpened = (payload) => ({type: SET_IS_CONTEXT_MENU_OPENED, payload})
export const setTypeContextMenu = (payload) => ({type: SET_TYPE_CONTEXT_MENU, payload})
export const setPositionContextMenu = (payload) => ({type: SET_POSITION_CONTEXT_MENU, payload})