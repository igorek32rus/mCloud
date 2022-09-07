import React, { useState, useRef } from 'react'
import '../styles/Search.css'

import useFetch from '../hooks/useFetch'
import { URLS } from '../constants'

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [inputTimeout, setInputTimeout] = useState(false)
    const inputRef = useRef()
    const fetch = useFetch()

    const search = async (fileName) => {
        const reqParams = [{
            name: 'fileName',
            value: fileName
        }]

        const res = await fetch({
            url: URLS.SEARCH_FILES, 
            reqParams
        })
        setSearchResult(res.files.slice(0, 5))
    }

    const handleInputSearch = (event) => {
        setSearchValue(event.target.value)

        if (event.target.value === "") {
            clearTimeout(inputTimeout)
            setSearchResult([])
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
        inputRef.current.focus()
    }

    const handlerBlur = () => {
        setSearchResult([])
    }

    return (
        <div className="search">
            <div className="icon-search"></div>
            <input type="text" ref={inputRef} placeholder="Поиск файлов" value={searchValue} onChange={handleInputSearch} onBlur={handlerBlur} />
            <div className='search-clear' style={!!searchValue.length ? {visibility: 'visible'}: {visibility: 'hidden'}} onClick={handleClearSearch}>&times;</div>

            { searchResult.length > 0 &&
                <div className="search-result">
                    { searchResult.map(file => (
                        <div className="item">
                            <div className={file.type === "folder" ? "img_type folder" : "img_type file"}></div>
                            <div className="info">
                                <div className="filename">{file.name}</div>
                                <div className="folder">{file.parentName}</div>
                            </div>
                        </div>
                    )) }
                </div>
            }
            
        </div>
    )
}

export default Search