import { dirLoad, dirSetCurrentDir, dirSetErrorMessage } from "../dirReducer"
import { openModal } from "../modalWindowReducer"
import { URLS } from "../../constants"
import Button from "../../components/UI/button/Button"

export const asyncGetCategoryFiles = (parent, category, setLoading) => {
    return async dispatch => {
        try {
            let headers = {
                'Content-Type': 'application/json'
            }
            const token = localStorage.getItem('token')
            if (token) {
                headers['Authorization'] = 'Bearer ' + token
            }

            const response = await fetch(URLS.GET_FILES + `?parent=${parent}&category=${category}`, {
                method: 'GET',
                headers
            })

            const json = await response.json()

            if (json.error) {
                dispatch(openModal({
                    title: 'Ошибка',
                    children: <>
                        <p style={{margin: "10px 0"}}>{ json.error }</p>
                        <Button click={() => window.history.go(-1)} className="btn blue" style={{width: '100%', margin: 0}}>Назад</Button>
                    </>
                }))
                dispatch(dirSetErrorMessage(json.error))
                return
            }

            if (json.files && json.path) {
                dispatch(dirLoad({ dir: json.files, path: json.path }))
            }

            if (json.currentDir) {
                dispatch(dirSetCurrentDir(json.currentDir))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
}

export const asyncGetSearchFiles = (fileName, setLoading) => {
    return async dispatch => {
        try {
            let headers = {
                'Content-Type': 'application/json'
            }
            const token = localStorage.getItem('token')
            if (token) {
                headers['Authorization'] = 'Bearer ' + token
            }

            const response = await fetch(URLS.SEARCH_FILES + `?fileName=${fileName}`, {
                method: 'GET',
                headers
            })

            const json = await response.json()

            if (json.files) {
                dispatch(dirLoad({ dir: json.files, path: [] }))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
}

export const asyncGetSharedFile = (fileID) => {
    return async dispatch => {
        try {
            let headers = {}
            const token = localStorage.getItem('token')
            if (token) {
                headers['Authorization'] = 'Bearer ' + token
            }

            const response = await fetch(URLS.GET_SHARE_FILE + `?accessLink=${fileID}`, {
                method: 'GET',
                headers
            })

            const json = await response.json()

            if (json.files) {
                dispatch(dirLoad({ dir: json.files, path: [] }))
            }

            if (json.currentDir) {
                dispatch(dirSetCurrentDir(json.currentDir))
            }

            if (json.message) dirSetErrorMessage(json.message)
        } catch (error) {
            console.log(error)
        }
    }
}