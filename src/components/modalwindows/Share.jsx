import React from "react";
import Button from "../UI/button/Button";

function Share(props) {
    const handleShareBtn = () => {
        console.log('Copied');
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Поделиться</h1>
            <input type="text" value={"link for " + props.items[0].name} onChange={(e) => e.preventDefault()} />
            <Button click={handleShareBtn} style={{margin: 0}}>Скопировать ссылку</Button>
        </div>
    )
}

export default Share