import React, {useEffect, useContext, useCallback} from "react"
import { AuthContext, LoaderContext } from "../../Context"
import Loader from "../UI/loader/Loader"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import { useDispatch } from "react-redux"
import { authLoginAction } from "../../store/authReducer"

const Auth = ({setCheckAuth}) => {
    // const {setIsAuth, setUserData} = useContext(AuthContext)
    const {loading, setLoading} = useContext(LoaderContext)
    const fetch = useFetch()

    const dispatch = useDispatch()
  
    const auth = useCallback(async () => {
        setLoading(true)
        const res = await fetch({
            url: URLS.AUTH,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    
        if (res.token) {
            // setUserData(res.user)
            dispatch(authLoginAction(res.user))
            localStorage.setItem('token', res.token)
            // setIsAuth(true)
        }
        
        setCheckAuth(false)
        setLoading(false)
    }, [])

    useEffect(() => {
        auth()
    }, [auth])

    return (
        <>
            {loading && <Loader />}
        </>
    )
}

export default Auth