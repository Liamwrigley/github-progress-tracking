import axios from 'axios'
import { toast } from 'react-toastify';


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
});

// Response interceptor for handling global error logic:
instance.interceptors.response.use(
    response => {
        console.log('api res')
        return response
    },
    error => {
        console.log('api failed')
        toast.error(`Error: ${error.message || 'An error occurred'}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return Promise.reject(error);
    }
);


export const Get = async (url, settings = {}) => {
    const response = await instance.get(url, settings)
    return response.data
}

export const Post = async (url, settings = {}) => {
    const response = await instance.post(url, settings)
    return response.data
}