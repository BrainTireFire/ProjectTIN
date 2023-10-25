import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { User, UserForgetPasswordFormValues, UserFormValues, UserRegisterFormValues } from '../models/user';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_SETTINGS = {
    baseURL: 'http://localhost:5000/api/v1/'
}

export const apiClient = axios.create(DEFAULT_SETTINGS);
export const authClient = axios.create(DEFAULT_SETTINGS);

function getResponseToken<T>(response: AxiosResponse<T>): Promise<AxiosResponse<T>> {
    console.log(response.data)
    // @ts-ignore
    localStorage.setItem('jwt', response.data.token)
    return Promise.resolve(response);
}

async function setRequestToken(request: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (request.headers) {
        request.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
    }

    return request;
}

function handleResponseError(error: AxiosError): Promise<AxiosError> {
    if (error.response && error.response.data && error.response.data.error === true) {
        console.error('API response error:', error.response.data);
        //toast.error(error.response.data.message);
    }
    return Promise.reject(error);
}

// @ts-ignore
apiClient.interceptors.request.use(setRequestToken);
// @ts-ignore
authClient.interceptors.response.use(getResponseToken)

authClient.interceptors.response.use(undefined, handleResponseError);
apiClient.interceptors.response.use(undefined, handleResponseError);

// const responseBody = <T>(response: AxiosResponse<T>) => response;

// const requestsAuth = {
//     get: <T>(url: string) => authClient.get<T>(url).then(responseBody),
//     post: <T>(url: string, body: {}) => authClient.post<T>(url, body).then(responseBody),
// }

// const Account = {
//     current: () => requestsAuth.get<User>('/account'), // ERROR
//     login: (user: UserFormValues) => requestsAuth.post<User>('/login', user),
//     register: (user: UserRegisterFormValues) => requestsAuth.post<User>('/register', user),
//     forgotPassword: (user: UserForgetPasswordFormValues) => requestsAuth.post<User>('/forgetPassword', user)
// }

// const agent = {
//     Account
// }

// export default agent;