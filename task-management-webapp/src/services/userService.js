import HTTPService from "../utility/httpService";

const httpService = new HTTPService("http://localhost:4000");

export const signUp =  (data) => {
    return httpService.post(`/api/users/register`,data );
}

export const signIn = (data) => {
    return httpService.post(`/api/users/login`,data );
}

export const createTask = (data, token) => {
    return httpService.post(`/api/tasks/create`,data , { headers: { 'Authorization': token }});
}

export const getTasks = (token) => {
    return httpService.get(`/api/tasks/filter`, {} , { headers: { 'Authorization': token }});
}

export const deleteTask = (taskId, token) => {
    return httpService.delete(`/api/tasks/delete/${taskId}`, {} , { headers: { 'Authorization': token }});
}

export const completeTask = (taskId, token) => {
    return httpService.put(`/api/tasks/complete/${taskId}`, {} , { headers: { 'Authorization': token }});
}

export const filerTask = (status, name, token) => {
    let endpoint = '/api/tasks/filter';    
    
    if (status === 'all') {
        // No need to append anything for 'all'
        endpoint = endpoint;
    } else {
        // Append status and/or name if provided
        if (status && name) {
            endpoint += `?status=${status}&name=${name}`;
        } else if (status) {
            endpoint += `?status=${status}`;
        } else if (name) {
            endpoint += `?name=${name}`;
        }
    }

    return httpService.get(endpoint, {} , { headers: { 'Authorization': token }});
}