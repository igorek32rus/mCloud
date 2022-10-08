import { notificationRemove } from "../notificationReducer"

export const asyncRemoveNotification = (key) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(notificationRemove(key))
        }, 150);
    }
}