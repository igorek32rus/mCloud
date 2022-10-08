const defaultState = {
    notifications: []
}

const ADD_NOTIFICATION = "ADD_NOTIFICATION"
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"
const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION"
const FADEOUT_NOTIFICATION = "FADEOUT_NOTIFICATION"

export const notificationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
        return {...state, notifications: [...state.notifications, action.payload]}
    case REMOVE_NOTIFICATION:
        return {...state, notifications: state.notifications.filter(notify => notify.key !== action.payload)}
    case UPDATE_NOTIFICATION:
        const notification = state.notifications.find(item => item.key === action.payload.key)
        return {...state, 
            notifications: [...state.notifications.filter(item => item.key !== action.payload.key), 
                {...notification, ...action.payload.params} ]
            }
    case FADEOUT_NOTIFICATION: {
        const notification = state.notifications.find(item => item.key === action.payload)
        notification.fadeOut = true
        return {...state, notifications: [...state.notifications.filter(item => item.key !== action.payload), notification]}
    }
    default:
        return state
  }
}

export const notificationAdd = (payload) => ({type: ADD_NOTIFICATION, payload})
export const notificationRemove = (payload) => ({type: REMOVE_NOTIFICATION, payload})
export const notificationUpdate = (payload) => ({type: UPDATE_NOTIFICATION, payload})
export const notificationFadeout = (payload) => ({type: FADEOUT_NOTIFICATION, payload})