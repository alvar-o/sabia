export const setHeaders = headers => {
    if (localStorage.jwtToken)  return {
            ...headers,
            'Authorization': `Bearer ${localStorage.jwtToken}`
        }
    else return headers
}

export const apiCall = (method, api_path, data) => {
    return new Promise((resolve, reject) => {
        const url = 'https://sabia-backend.onrender.com' + api_path
        return fetch(url, {
            method,
            headers: setHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        })
        .then(res => {
            // if (!res.ok) throw Error(res.statusText);
            if (res.status === 204) return res.status;
            return res.json();
        })
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            reject(err)})
    })
}