import React from "react";

function Button(props) {
    return (
        <button type="button" className="btn" style={props.style} onClick={() => props.click()}>{props.children}</button>
    )
}

export default Button