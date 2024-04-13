import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8888/api/',
    timeout: 15000,
    headers: {'X-Custom-Header': 'foobar'}
});

const AUTH_TOKEN : string = localStorage.getItem("auth") !== null ? JSON.parse(localStorage.getItem("auth")!) : "";

instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;


export default instance;