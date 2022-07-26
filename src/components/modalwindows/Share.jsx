import React from "react"
import Button from "../UI/button/Button"

function Share({items}) {
    const handleShareBtn = () => {
        console.log('Copied');
    }

    return (
        <>
            <input type="text" value={"link for " + items[0].name} onChange={(e) => e.preventDefault()} />
            <Button click={handleShareBtn} style={{margin: 0}}>Скопировать ссылку</Button>
        </>
    )
}

export default Share