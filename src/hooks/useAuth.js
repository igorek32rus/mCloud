import { useDispatch } from "react-redux"

import useFetch from "./useFetch"
import { URLS } from "../constants"
import { authLoginAction, authSetLoading } from "../store/authReducer"

export const useAuth = () => {
    const fetch = useFetch()
    const dispatch = useDispatch()
  
    return async () => {
        dispatch(authSetLoading(true))
        const res = await fetch({
            url: URLS.AUTH,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }) 
    
        if (res.token) {
            dispatch(authLoginAction(res.user))
            localStorage.setItem('token', res.token)
        }
        
        dispatch(authSetLoading(false))
    }
}