import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import { AuthContext, NotifyContext } from './Context'
import fetchReq from './utils/fetchReq'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [notifications, setNotifications] = useState([])

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
      show: true
    }
    setNotifications([...notifications, newNotification])
  }

  const removeNotification = (key) => {
    // const notification = notifications.find(item => item.key === key)
    // notification.show = false
    // setNotifications([...notifications.filter(item => item.key !== key), notification])
    // setTimeout(() => {
      setNotifications(notifications.filter(item => item.key !== key))
    //   console.log(notifications);
    // }, 150);
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
