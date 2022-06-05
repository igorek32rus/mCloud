import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import { AuthContext, NotifyContext } from './Context'
import fetchReq from './utils/fetchReq'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [notifications, setNotifications] = useState([])

  const notificationsRef = useRef()
  notificationsRef.current = notifications

  const auth = async () => {
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
    <AuthContext.Provider value={{isAuth, setIsAuth, userData, setUserData}}>
      <NotifyContext.Provider value={{notifications, createNotification, removeNotification}}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </NotifyContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
