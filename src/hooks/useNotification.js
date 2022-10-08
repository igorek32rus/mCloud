import { useDispatch } from "react-redux"
import { notificationAdd, notificationUpdate, notificationFadeout } from "../store/notificationReducer"
import { asyncRemoveNotification } from "../store/asyncActions/notifications"

export default function useNotification() {
    const dispatch = useDispatch()

    const createNotification = (params) => {
        const id = Date.now() - (Math.floor(Math.random() * 100)) + ''
        let newNotification = {
            key: id,
            title: '',
            message: '',
            time: 3,
            fadeOut: false,
            delete: false,
            showProgress: false,
            progress: 0
        }

        newNotification = {...newNotification, ...params}
    
        dispatch(notificationAdd(newNotification))
    
        if (newNotification.time > 0) {
            setTimeout(() => {
                removeNotification(newNotification.key)
            }, newNotification.time * 1000);
        }
    
        return id
    }
    
    const removeNotification = (key) => {
        dispatch(notificationFadeout(key))
        dispatch(asyncRemoveNotification(key))
    }

    const updateNotification = (key, params = {}) => {
        dispatch(notificationUpdate({key, params}))
    }

    return [createNotification, removeNotification, updateNotification]
}