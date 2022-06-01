const fetchReq = async ({url = '', method = 'GET', data = {}, headers = {
    'Content-Type': 'application/json'
}}) => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(data)
        })
        
        return await response.json()   
    } catch (error) {
        console.log(error);
    }
}

export default fetchReq