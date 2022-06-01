const fetchReq = async ({url = '', method = 'GET', data = {}, headers = {
    'Content-Type': 'application/json'
}}) => {
    try {
        const params = {method, headers}
        if (method === 'POST') params.body = JSON.stringify(data)

        const response = await fetch(url, params)
        
        return await response.json()   
    } catch (error) {
        console.log(error);
        return {status: 'error', message: 'Ошибка подключения к серверу'}
    }
}

export default fetchReq