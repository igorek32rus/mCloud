import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../styles/Search.css'

import useFetch from '../hooks/useFetch'
import { URLS } from '../constants'

import { setSelected, clearSelected } from '../store/selectionReducer'

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [inputTimeout, setInputTimeout] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [openFullSearch, setOpenFullSearch] = useState(false)

    const dispatch = useDispatch()

    const inputRef = useRef()
    const fetch = useFetch()
    const history = useHistory()

    const search = async (fileName) => {
        const reqParams = [{
            name: 'fileName',
            value: fileName
        }]

        const res = await fetch({
            url: URLS.SEARCH_FILES, 
            reqParams
        })

        if (res.files) {
            setSearchResult(res.files.slice(0, 5))
            setShowResults(true)
        }

        if (res.files.length > 5) {
            setOpenFullSearch(true)
            return
        }
        
        setOpenFullSearch(false)
    }

    const handleInputSearch = (event) => {
        setSearchValue(event.target.value)

        if (event.target.value === "") {
            clearTimeout(inputTimeout)
            setSearchResult([])
            setShowResults(false)
            return
        }

        if (inputTimeout)
            clearTimeout(inputTimeout)

        setInputTimeout(
            setTimeout(() => {
                search(event.target.value)
            }, 500)
        )
    }

    const handleClearSearch = () => {
        setSearchValue("")
        setSearchResult([])
        setShowResults(false)
        inputRef.current.focus()
    }

    const handlerBlur = () => {
        setTimeout(() => {
            setShowResults(false)
        }, 100);
    }

    const handlerFocus = () => {
        if (searchResult.length > 0) {
            setShowResults(true)
        }
    }

    const handlerClick = (fileId) => {
        dispatch(setSelected([fileId]))
        history.push("/files/search/" + searchValue)
    }

    const handlerClickFullSearch = () => {
        dispatch(clearSelected())
        history.push("/files/search/" + searchValue)
    }

    return (
        <div className="search">
            <div className="icon-search"></div>
            <input type="text" ref={inputRef} placeholder="Поиск файлов" value={searchValue} onChange={handleInputSearch} onBlur={handlerBlur} onFocus={handlerFocus} />
            <div className='search-clear' style={!!searchValue.length ? {visibility: 'visible'}: {visibility: 'hidden'}} onClick={handleClearSearch}>&times;</div>

            { showResults && (
                <div className="search-result">
                    { searchResult.length > 0 &&
                        searchResult.map(file => (
                            <div className="item" key={file._id} onClick={() => handlerClick(file._id)}>
                                <div className={file.type === "folder" ? "img_type folder" : "img_type file"}></div>
                                <div className="info">
                                    <div className="filename">{file.name}</div>
                                    <div className="folder">{file.parentName}</div>
                                </div>
                            </div>
                        )) 
                    }
                    { searchResult.length === 0 && (
                        <div className="item" key={"Nothing_found"} >
                            <div className="info">
                                <div className="filename">По данному запросу ничего не найдено</div>
                                <div className="folder">Попробуйте изменить параметры поиска</div>
                            </div>
                        </div>
                    ) }
                    { openFullSearch && (
                        <div className="item" key={"Too_many_results"} onClick={handlerClickFullSearch} >
                            <div className="info">
                                <div className="filename">Открыть страницу поиска</div>
                                {/* <div className="folder">Попробуйте изменить параметры поиска</div> */}
                            </div>
                        </div>
                    ) }
                </div>
            ) }
            
            
        </div>
    )
}

export default Search