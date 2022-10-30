import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './MainPage.scss'

import Header from '../../components/Header/Header'
import Notifications from '../../components/UI/notifications/Notifications/Notifications'
import Footer from '../../components/Footer/Footer'
import TopPanel from '../../components/TopPanel/TopPanel'
import TitlePage from '../../components/TitlePage/TitlePage'
import DirContent from '../../components/DirContent/DirContent'
import Loader from '../../components/UI/loader/Loader'
import Sidebar from '../../components/Sidebar/Sidebar'
import Modal from '../../components/UI/modal/Modal'
import BackButton from '../../components/TitlePage/components/BackButton'

import categories from '../../categories'

import { asyncGetCategoryFiles, asyncGetSearchFiles } from '../../store/asyncActions/dir'
import { clearPositionFiles } from '../../store/selectionReducer'
import { clearSelected } from "../../store/selectionReducer"

function MainPage() {
    const userData = useSelector(state => state.auth.userData)
    const { path, currentDir } = useSelector(state => state.dir)
    const [loading, setLoading] = useState(true)
    const { modalOpened } = useSelector(state => state.modalWindow)
    const dispatch = useDispatch()

    const { category, parent, fileID } = useParams()
    const categoryParams = categories.find(cat => cat.name === category)

    useEffect(() => {
        if ((category !== "search") && (!fileID)) {
            dispatch(clearSelected())
        }

        dispatch(clearPositionFiles())
        setLoading(true)
        if (category === "search") {
            dispatch(asyncGetSearchFiles(parent, setLoading))
        } else {
            dispatch(asyncGetCategoryFiles(parent, category, setLoading))
        }
    }, [category, parent])

    return (
        <>

            <>
                <Header />
                <Sidebar />
            </>
            <div className="main-page">
                <>
                    { modalOpened && <Modal /> }
                    {categoryParams.showTopPanel && <TopPanel path={path} />}
                    <TitlePage>
                        {parent !== userData.rootId && categoryParams.showBackButtonInTitle && <BackButton />}
                        <h1>
                            {currentDir?._id === userData.rootId || category === "search"
                                ? categoryParams.title
                                : currentDir?.name
                            }
                        </h1>
                    </TitlePage>
                    {loading
                        ? <Loader />
                        : <DirContent />
                    }
                </>
            </div>
            <Notifications />
            <Footer />

        </>
    );
}

export default MainPage
