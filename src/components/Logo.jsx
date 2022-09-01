import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
    return (
        <Link to="/files">
            <div className="logo" href="#">
                <div className="logo-img"></div>
                <span className="thin">m</span><span className="bold">Cloud</span>
            </div>
        </Link>
    )
}

export default Logo