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

const httpGet = async(endpoint:string, options?: APIRequestOptions) => {
    try {
        const response = await axiosInstance().get(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const httpPost = async(endpoint:string, data?: unknown, options?: APIRequestOptions) => {
    try {
        const response = await axiosInstance().post(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

const httpPut = async(endpoint:string, data?: unknown, options?: APIRequestOptions) => {
    try {
        const response = await axiosInstance().put(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error putting data:', error);
        throw error;
    }
};
const httpPatch = async(endpoint:string, data?: unknown, options?: APIRequestOptions) => {
    try {
        const response = await axiosInstance().patch(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error patching data:', error);
        throw error;
    }
};


const httpDelete = async(endpoint:string, options?: APIRequestOptions) => {
    try {
        const response = await axiosInstance().delete(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
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