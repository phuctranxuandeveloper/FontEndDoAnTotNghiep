import { AxiosError, AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import instance from "./Axios";

interface ResponseLogin {
    token: string,
    refreshToken: string
}

const responseBody = (response: AxiosResponse) => response.data;
const responseError = (response: AxiosError<string>) => response.response?.data;

const loginRequests = {
    post: (url: string, body: LoginRequest) =>
        instance.post<LoginRequest>(url, body).then(responseBody).catch(responseError)
}

const login = (req : LoginRequest) : Promise<ResponseLogin> => {
    return loginRequests.post("/auth/signin", req);
}

export {login}