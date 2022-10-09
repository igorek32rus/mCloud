const defaultState = {
    dir: [],
    path: [],
    currentDir: null,
    errorMessage: "",
    loading: false
}

const LOAD_DIR = "LOAD_DIR"
const ADD_FILE = "ADD_FILE"
const REMOVE_FILE = "REMOVE_FILE"
const REMOVE_FILES = "REMOVE_FILES"
const UPDATE_FILE = "UPDATE_FILE"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const SET_ERROR = "SET_ERROR"
const SET_LOADING = "SET_LOADING"
const UPDATE_DIR = "UPDATE_DIR"

export const dirReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_DIR:
            return { ...state, dir: action.payload.dir, path: action.payload.path }
        case ADD_FILE:
            return { ...state, dir: [...state.dir, action.payload] }
        case REMOVE_FILE:
            return { ...state, dir: state.dir.filter(item => item._id !== action.payload) }
        case REMOVE_FILES:
            return { ...state, dir: state.dir.filter(file => !action.payload.find(itemDel => itemDel._id === file._id)) }
        case UPDATE_FILE:
            return { ...state, dir: [...state.dir.filter(file => file._id !== action.payload._id), action.payload] }
        case SET_CURRENT_DIR:
            return { ...state, currentDir: action.payload }
        case SET_ERROR:
            return { ...state, errorMessage: action.payload }
        case SET_LOADING:
            return { ...state, loading: action.payload, errorMessage: action.payload && "" }
        case UPDATE_DIR:
            return { ...state, dir: action.payload }
        default:
            return state
    }
}

export const dirLoad = (payload) => ({ type: LOAD_DIR, payload })
export const dirAddFile = (payload) => ({ type: ADD_FILE, payload })
export const dirRemoveFile = (payload) => ({ type: REMOVE_FILE, payload })
export const dirRemoveFiles = (payload) => ({ type: REMOVE_FILES, payload })
export const dirUpdateFile = (payload) => ({ type: UPDATE_FILE, payload })
export const dirSetCurrentDir = (payload) => ({ type: SET_CURRENT_DIR, payload })
export const dirSetErrorMessage = (payload) => ({ type: SET_ERROR, payload })
export const dirSetLoading = (payload) => ({ type: SET_LOADING, payload })
export const dirUpdateDir = (payload) => ({ type: UPDATE_DIR, payload })