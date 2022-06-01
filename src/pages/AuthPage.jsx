import React, { useState } from 'react';

import Header from "../components/Header";
import Footer from '../components/Footer';

import '../styles/App.css'
import Auth from '../components/Auth/Auth';
import { RegistrationContext } from '../Context';

function AuthPage() {
  const [reg, setReg] = useState(false)   // Если false - вход, true - регистрация

  return (
    <div className="pageBody">
        <RegistrationContext.Provider value={{reg, setReg}}>
          <Header />
          <Auth />
        </RegistrationContext.Provider>
        <Footer />
    </div>
  );
}

export default AuthPage;
