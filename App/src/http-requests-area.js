import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.0.123:8080",
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
    withCredentials: true
});