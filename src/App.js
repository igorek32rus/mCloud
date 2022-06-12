import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, useHistory } from 'react-router-dom'
import AppRouter from './AppRouter'
import { AuthContext, NotifyContext, LoaderContext } from './Context'
import fetchReq from './utils/fetchReq'

import Header from './components/Header'
import Notify from './components/Notify'
import Footer from './components/Footer'
import Loader from './components/UI/loader/Loader'
import './styles/App.css'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [registration, setRegistration] = useState(false)   // если true - страница регистрации, иначе - логин

  const history = useHistory()

  const notificationsRef = useRef()
  notificationsRef.current = notifications

  const timoutPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
  } 

  const auth = async () => {
    setLoading(true)
    const res = await fetchReq({
      url: 'http://localhost:5000/api/auth/auth',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setLoading(false)

    if (res.token) {
      setUserData(res.user)
      localStorage.setItem('token', res.token)
      setIsAuth(true)
      return
    }

  }

  const createNotification = ({title = '', message = '', time = 3}) => {
    const id = Date.now() + ''
    const newNotification = {
      key: id,
      title,
      message,
      time,
      fadeOut: false,
      delete: false
    }

    setNotifications([...notifications, newNotification])

    if (time > 0) {
      setTimeout(() => {
        removeNotification(newNotification.key)
      }, time * 1000);
    }
  }

  const removeNotification = (key) => {
    const notification = notificationsRef.current.find(item => item.key === key)
    notification.fadeOut = true
    setNotifications([
      ...notificationsRef.current.filter(item => item.key !== key),
      notification
    ])
    setTimeout(() => {
      setNotifications(notificationsRef.current.filter(item => item.key !== key))
    }, 150);
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, userData, setUserData, registration, setRegistration}}>
      <NotifyContext.Provider value={{notifications, createNotification, removeNotification}}>
        <LoaderContext.Provider value={{loading, setLoading}} >
          <BrowserRouter>
            <Header />
            { loading ? <Loader /> : <AppRouter /> }
            <Notify />
            <Footer />
          </BrowserRouter>
        </LoaderContext.Provider>
      </NotifyContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
