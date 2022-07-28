import React, {useEffect, useContext, useCallback} from "react"
import { AuthContext, LoaderContext } from "../../Context"
import Loader from "../UI/loader/Loader"
import fetchReq from "../../utils/fetchReq"

const Auth = ({setCheckAuth}) => {
    const {setIsAuth, setUserData} = useContext(AuthContext)
    const {loading, setLoading} = useContext(LoaderContext)
  
    const auth = useCallback(async () => {
        setLoading(true)
        const res = await fetchReq({
            url: 'http://localhost:5000/api/auth/auth',
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