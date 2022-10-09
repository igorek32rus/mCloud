const defaultState = {
    selection: false,
    selected: [],
    positionSelection: {
        startX: 0,
        startY: 0,
        left: 0,
        top: 0,
        width: 0,
        height: 0
    },
    positionFiles: []
}

const SET_IS_SELECTION = "SET_IS_SELECTION"

const ADD_SELECTED = "ADD_SELECTED"
const REMOVE_SELECTED = "REMOVE_SELECTED"
const CLEAR_SELECTED = "CLEAR_SELECTED"
const SET_SELECTED = "SET_SELECTED"

const UPDATE_POSITION_SELECTION = "UPDATE_POSITION_SELECTION"

const ADD_POSITION_FILE = "ADD_POSITION_FILE"
const REMOVE_POSITION_FILES = "REMOVE_POSITION_FILES"
const CLEAR_POSITION_FILES = "CLEAR_POSITION_FILES"
const RESET_CHANGED_OF_POSITION_FILES = "RESET_CHANGED_OF_POSITION_FILES"

export const selectionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_SELECTION:
        return {...state, selection: action.payload}

    case ADD_SELECTED:
        return {...state, selected: [...state.selected.filter(item => item !== action.payload), action.payload]}
    case REMOVE_SELECTED:
        return {...state, selected: state.selected.filter(item => item !== action.payload) }
    case CLEAR_SELECTED:
        return {...state, selected: []}
    case SET_SELECTED:
        return {...state, selected: action.payload}

    case UPDATE_POSITION_SELECTION:
        return {...state, positionSelection: {...state.positionSelection, ...action.payload}}

    case ADD_POSITION_FILE:
        return {...state, positionFiles: [...state.positionFiles.filter(item => item._id !== action.payload._id), action.payload]}
    case REMOVE_POSITION_FILES:
        return {...state, positionFiles: state.positionFiles.filter(pos => !action.payload.find(item => item._id === pos._id))}
    case CLEAR_POSITION_FILES:
        return {...state, positionFiles: []}
    case RESET_CHANGED_OF_POSITION_FILES:
        return {...state, positionFiles: state.positionFiles.reduce((prev, cur) => [...prev, {...cur, changed: false}], []) }

    default:
        return state
  }
}

export const setIsSelection = (payload) => ({type: SET_IS_SELECTION, payload})

export const addSelected = (payload) => ({type: ADD_SELECTED, payload})
export const removeSelected = (payload) => ({type: REMOVE_SELECTED, payload})
export const clearSelected = (payload) => ({type: CLEAR_SELECTED, payload})
export const setSelected = (payload) => ({type: SET_SELECTED, payload})

export const updatePositionSelection = (payload) => ({type: UPDATE_POSITION_SELECTION, payload})

export const addPositionFile = (payload) => ({type: ADD_POSITION_FILE, payload})
export const removePositionFiles = (payload) => ({type: REMOVE_POSITION_FILES, payload})
export const clearPositionFiles = (payload) => ({type: CLEAR_POSITION_FILES, payload})
export const resetChangedPositionFiles = (payload) => ({type: RESET_CHANGED_OF_POSITION_FILES, payload})