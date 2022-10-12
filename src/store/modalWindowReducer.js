const defaultState = {
    modalOpened: false,
    modalContent: null
}

const SET_MODAL_OPENED = "SET_MODAL_OPENED"
const SET_MODAL_CLOSED = "SET_MODAL_CLOSED"

export const modalWindowReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MODAL_OPENED:
            return {...state, modalOpened: true, modalContent: {...state.modalContent, ...action.payload}}
        case SET_MODAL_CLOSED:
            return {...state, modalOpened: false}

        default:
            return state
    }
}

export const openModal = (payload) => ({type: SET_MODAL_OPENED, payload})
export const closeModal = (payload) => ({type: SET_MODAL_CLOSED, payload})