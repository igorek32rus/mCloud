import React from "react";

function Checkbox(props) {
    return (
        <div>
            <input type="checkbox" className="check-custom" checked={props.checked} onChange={(e) => e.preventDefault()} />
            <span className="check-toggle"></span>
        </div>
    )
}

export default Checkbox