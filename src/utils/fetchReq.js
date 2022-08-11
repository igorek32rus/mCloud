const stringRequestParams = (params) => {
    if (!params.length) return ''

    const result = params.reduce((prev, param, i) => {
        return prev + (i === 0 ? param.name + '=' + param.value : '&' + param.name + '=' + param.value)
    }, '?')
    return result
}

const fetchReq = async ({url = '', reqParams = [], method = 'GET', data = {}, headers = {
    'Content-Type': 'application/json'
}}) => {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            headers['Authorization'] = 'Bearer ' + token
        }
        const params = {method, headers}
        if (method === 'POST') params.body = JSON.stringify(data)

        const urlReqParams = stringRequestParams(reqParams)
        const response = await fetch(url + urlReqParams, params)
        
        return await response.json()   
    } catch (error) {
        console.log(error);
        return {status: 'error', message: 'Ошибка подключения к серверу'}
    }
}

export default fetchReq