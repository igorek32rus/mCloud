import React, {useEffect, useContext, useCallback} from "react"
import { AuthContext, LoaderContext } from "../../Context"
import Loader from "../UI/loader/Loader"
import fetchReq from "../../utils/fetchReq"
import { URLS } from "../../constants"

const Auth = ({setCheckAuth}) => {
    const {setIsAuth, setUserData} = useContext(AuthContext)
    const {loading, setLoading} = useContext(LoaderContext)
  
    const auth = useCallback(async () => {
        setLoading(true)
        const res = await fetchReq({
            url: URLS.AUTH,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    
        if (res.token) {
            setUserData(res.user)
            localStorage.setItem('token', res.token)
            setIsAuth(true)
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