import React, {useState} from "react"


const Tree = ({tree, setTargetFolder}) => {
    const [selected, setSelected] = useState(null)

    const handlerSelectFolder = (id) => {
        setSelected(id)
        setTargetFolder(id)
    }

    const treeToList = (parent, depth) => {
        if (!parent) return <></>
    
        let list = <li className={selected === parent._id ? "selected" : undefined} key={parent._id} onClick={() => handlerSelectFolder(parent._id)}>
            {'-'.repeat(depth) 
            + (depth ? ' ' : '') 
            + parent.name}
        </li>
    
        depth++
        for (let i = 0; i < parent.childs.length; i++) {
            list = [list, <ul key={parent.childs[i]._id}>{treeToList(parent.childs[i], depth)}</ul>]
        }
    
        return list
    }

    return (
        <div className="tree">
            <ul key={tree._id}>
                {treeToList(tree, 0)}
            </ul>
        </div>
    )
}

export default Tree