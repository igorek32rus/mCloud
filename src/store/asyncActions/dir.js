import { dirLoad, dirSetCurrentDir, dirSetErrorMessage } from "../dirReducer"
import { URLS } from "../../constants"

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