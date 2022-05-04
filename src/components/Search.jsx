import { React, useState } from 'react'

import '../styles/Search.css'

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [isSearchResult, setSearchResult] = useState(false)

    const handleInputSearch = (event) => {
        setSearchValue(event.target.value)

        if (event.target.value.length >= 3) {
            setSearchResult(true)
            return
        }

        setSearchResult(false)
    }

    const handleBlurSearch = () => {
        setSearchResult(false)
    }

    return (
        <div className="search">
            <div className="icon-search"></div>
            <input type="text" placeholder="Поиск файлов" value={searchValue} onChange={handleInputSearch} onBlur={handleBlurSearch} />

            { isSearchResult &&
                <div className="search-result">
                    <div className="item">
                        <div className="filename">Test</div>
                        <div className="folder">Главная</div>
                    </div>
                    <div className="item">
                        <div className="filename">Test</div>
                        <div className="folder">Главная</div>
                    </div>
                    <div className="item">
                        <div className="filename">Test</div>
                        <div className="folder">Главная</div>
                    </div>
                    <div className="item">
                        <div className="filename">Test</div>
                        <div className="folder">Главная</div>
                    </div>
                    <div className="item">
                        <div className="filename">Test</div>
                        <div className="folder">Главная</div>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default Search