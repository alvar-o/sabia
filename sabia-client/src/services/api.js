export const setHeaders = headers => {
    if (localStorage.jwtToken)  return {
            ...headers,
            'Authorization': `Bearer ${localStorage.jwtToken}`
        }
    else return headers
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return fetch(path, {
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