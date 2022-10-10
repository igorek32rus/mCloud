const defaultState = {
    dragStart: false,
    dragFileId: 0,
    positionStart: {
        startX: 0,
        startY: 0
    },
    shiftPosition: {
        posX: 0,
        posY: 0
    },
    dragnDropGoal: 0,
}

const SET_IS_DRAGSTART = "SET_IS_DRAGSTART"
const SET_DRAG_FILEID = "SET_DRAG_FILEID"
const SET_POSITION_START = "SET_POSITION_START"
const SET_SHIFT_POSITION = "SET_SHIFT_POSITION"
const SET_DRAG_GOAL = "SET_DRAG_GOAL"

export const dragAndDropReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_DRAGSTART:
            return { ...state, dragStart: action.payload }
        case SET_DRAG_FILEID:
            return { ...state, dragFileId: action.payload }
        case SET_POSITION_START:
            return { ...state, positionStart: { ...state.positionStart, ...action.payload } }
        case SET_SHIFT_POSITION:
            return { ...state, shiftPosition: { ...state.shiftPosition, ...action.payload } }
        case SET_DRAG_GOAL:
            return { ...state, dragnDropGoal: action.payload }

        default:
            return state
    }
}

export const setIsDragStart = (payload) => ({ type: SET_IS_DRAGSTART, payload })
export const setDragFileID = (payload) => ({ type: SET_DRAG_FILEID, payload })
export const setPositionStart = (payload) => ({ type: SET_POSITION_START, payload })
export const setShiftPosition = (payload) => ({ type: SET_SHIFT_POSITION, payload })
export const setDragGoal = (payload) => ({ type: SET_DRAG_GOAL, payload })