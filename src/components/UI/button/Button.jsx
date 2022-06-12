import React from "react";
import './Button.css'

function Button(props) {
    return (
        <button type="button" className="btn" style={props.style} onClick={() => props.click()}>{props.children}</button>
    )
}

export default Button