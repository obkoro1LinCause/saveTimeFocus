import axios, { type AxiosRequestConfig, type AxiosResponse,AxiosError} from 'axios';
import { statusMap, type AjaxResult } from './type';

//后端服务
export enum domainURLEnum {
    dev = 'http://localhost:8010',
    test = '',
    stg= '',
    prod= '',
   
}

export type BackendURLKeys = keyof typeof domainURLEnum;
type RequestHandler = <T = any>(url: string, payload?: any, reqOption?: any) => Promise<AjaxResult<T>>;
type HttpMethods = 'get' | 'post' | 'put' | 'delete';
export type HttpMethodHandler = Record<HttpMethods, RequestHandler>;
const backendURLMap = new Map<BackendURLKeys, string>();
type HttpServices = Record<BackendURLKeys, HttpMethodHandler>;
const httpServices = {} as HttpServices;

function createService(suffixURL = ''): HttpMethodHandler {

    const newURL = `${suffixURL}` ;
    const config:AxiosRequestConfig = {
        baseURL: newURL,
        timeout: 60000
    };

    const axiosInstance = axios.create(config);

    // 请求拦截器
    axiosInstance.interceptors.request.use((config)=>{
        config.headers.Authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE4NzUwMDkwMzYyQDE2My5jb20iLCJwYXNzd29yZCI6IjFxYXoiLCJpYXQiOjE2OTE1NjgwMDh9.DR2_5gjDlsycNsopUYd4OEL3LFaCAWb4voZvD6FD-GQ`;
        return config;
    },(error:AxiosError)=>{
        return Promise.reject(error);
    });
    
    // 响应拦截器
    axiosInstance.interceptors.response.use((response:AxiosResponse)=>{
        const data = response?.data || {};
        const code = response?.status;
        if(data?.status!=='success' && code!== 200){
            return Promise.reject(data);
        }
        return { ...data,code };

    }, (error:AxiosError)=>{
        // 错误拦截
        const errorResponse = error?.response;
        return Promise.reject(errorResponse?.data);
    });
    return {
        get<T = any>(url: string, data?: any, options?: any): Promise<AjaxResult<T>> {
            return axiosInstance.get(url, { params: data, ...options });
        },
        post<T = any>(url: string, data?: any, options?: any): Promise<AjaxResult<T>> {
            return axiosInstance.post(url, data, options);
        },
        delete<T = any>(url: string, data?: any, options?: any): Promise<AjaxResult<T>> {
            return axiosInstance.delete(url, {
                params: data,
                ...options
            });
        },
        put<T = any>(url: string, data?: any, options?: any): Promise<AjaxResult<T>> {
            return axiosInstance.put(url, data, options);
        }
    };
}

function initServices(){
    for (const entry of Object.entries(domainURLEnum)) {
        const [key, url] = entry as [BackendURLKeys, domainURLEnum];
        httpServices[key] = createService(url);
        
    }
}

initServices();

export default httpServices;
