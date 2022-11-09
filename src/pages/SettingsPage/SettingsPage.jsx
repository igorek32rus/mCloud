import React, { useState } from "react"
import './SettingsPage.scss'

import Notifications from "../../components/UI/notifications/Notifications/Notifications"
import Loader from "../../components/UI/loader/Loader"
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Footer from "../../components/Footer/Footer"
import TitlePage from "../../components/TitlePage/TitlePage"

const SettingsPage = () => {
    const [loading, setLoading] = useState(false)

    return (
        <>
            { loading ? <Loader /> : (
                <>
                    <>
                        <Header />
                        <Sidebar />
                    </>
                    <div className="settings-page">
                        <div className="settings-content">
                            <TitlePage margin="">
                                <h1>Настройки</h1>
                            </TitlePage>
                        </div>
                    </div>
                    <Notifications />
                    <Footer />
                </>
            )}
        </>
    )
}

export default SettingsPage