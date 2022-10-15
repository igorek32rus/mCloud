import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header/Header'
import Notify from '../../components/Notify'
import Footer from '../../components/Footer'
import TopPanel from '../../components/TopPanel'
import TitlePage from '../../components/TitlePage'
import DirShareContent from '../../components/DirShareContent'
import Loader from '../../components/UI/loader/Loader'
import Sidebar from '../../components/Sidebar/Sidebar'
import Modal from '../../components/UI/modal/Modal'

import './SharePage.scss'

import { asyncGetSharedFile } from '../../store/asyncActions/dir'
import { clearPositionFiles } from '../../store/selectionReducer'

function SharePage() {
    const dispatch = useDispatch()
    const { loading, currentDir, errorMessage } = useSelector(state => state.dir)
    const { modalOpened } = useSelector(state => state.modalWindow)

    const { fileID } = useParams()

    useEffect(() => {
        dispatch(clearPositionFiles())
        dispatch(asyncGetSharedFile(fileID))
    }, [])

    return (
        <>
            <>
                <Header />
                <Sidebar />
            </>
            <div className="share-page">
                <>
                    { modalOpened && <Modal /> }
                    {/* <TopPanel path={path} /> */}
                    <TitlePage>
                        <h1>{currentDir === "folder" ? currentDir.name : "Общий доступ"}</h1>
                    </TitlePage>
                    {loading
                        ? <Loader />
                        : <>
                            {errorMessage ? <div class="message" style={{ marginTop: 10 }}>{errorMessage}</div> : <DirShareContent />}
                        </>
                    }
                </>
            </div>
            <Notify />
            <Footer />
        </>
    );
}

export default SharePage
