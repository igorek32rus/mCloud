import React, { useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import { AuthContext, NotifyContext, LoaderContext } from './Context'

import Header from './components/Header'
import Notify from './components/Notify'
import Footer from './components/Footer'
import './styles/App.css'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  
  const notificationsRef = useRef()
  notificationsRef.current = notifications

  const createNotification = ({title = '', message = '', time = 3}) => {
    const id = Date.now() - (Math.floor(Math.random() * 100)) + ''
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

    return id
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

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, userData, setUserData}}>
      <NotifyContext.Provider value={{notifications, createNotification, removeNotification}}>
        <LoaderContext.Provider value={{loading, setLoading}} >
          <BrowserRouter>
            <Header />
            <AppRouter />
            <Notify />
            <Footer />
          </BrowserRouter>
        </LoaderContext.Provider>
      </NotifyContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
