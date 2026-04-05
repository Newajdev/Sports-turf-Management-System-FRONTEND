import { ApiResponse } from '@/types/api.type';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return instance;
}

export interface APIRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

const httpGet = async <T>(endpoint:string, options?: APIRequestOptions):Promise<ApiResponse<T>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.get<ApiResponse<T>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

const httpPost = async <T>(endpoint:string, data?: unknown, options?: APIRequestOptions):Promise<ApiResponse<T>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.post<ApiResponse<T>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Error posting data to ${endpoint}:`, error);
        throw error;
    }
};

const httpPut = async <T>(endpoint:string, data?: unknown, options?: APIRequestOptions):Promise<ApiResponse<T>> => {
    try {
        const instance   = await axiosInstance();
        const response = await instance.put<ApiResponse<T>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Error putting data to ${endpoint}:`, error);
        throw error;
    }
};
const httpPatch = async <T>(endpoint:string, data?: unknown, options?: APIRequestOptions):Promise<ApiResponse<T>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.patch<ApiResponse<T>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Error patching data to ${endpoint}:`, error);
        throw error;
    }
};


const httpDelete = async <T>(endpoint:string, options?: APIRequestOptions):Promise<ApiResponse<T>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.delete<ApiResponse<T>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting data from ${endpoint}:`, error);
        throw error;
    }
};


export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete, 

}