import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8888/api/',
    timeout: 15000,
    headers: {'X-Custom-Header': 'foobar'}
});


export default instance;