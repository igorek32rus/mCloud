import React, { useState, useContext } from 'react';

import Header from "../components/Header";
import Footer from '../components/Footer';
import Notify from '../components/Notify';

import '../styles/App.css'
import Auth from '../components/Auth/Auth';
import { RegistrationContext, LoaderContext } from '../Context';
import Loader from '../components/UI/loader/Loader';

function AuthPage() {
  const [reg, setReg] = useState(false)   // Если false - вход, true - регистрация
  const {loading} = useContext(LoaderContext)

  return (
    <div className="pageBody">
      <RegistrationContext.Provider value={{reg, setReg}}>
        <Header />
        { loading ? <Loader /> : <Auth />}
        <Notify />
      </RegistrationContext.Provider>
      <Footer />
    </div>
  );
}

export default AuthPage;
