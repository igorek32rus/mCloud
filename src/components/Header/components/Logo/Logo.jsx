import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.scss'

function Logo() {
    return (
        <Link to="/files">
            <div className="logo">
                <div className="logo-img"></div>
                <span className="thin">m</span><span className="bold">Cloud</span>
            </div>
        </Link>
    )
}

export default Logo