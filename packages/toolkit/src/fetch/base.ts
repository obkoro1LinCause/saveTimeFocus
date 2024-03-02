import axios, { type AxiosRequestConfig, type AxiosResponse,AxiosError} from 'axios';
import { statusMap, type AjaxResult } from './type';
import { message } from 'ant-design-vue';

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
        const token = localStorage.getItem('user-token');
        if(!token) return config;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },(error:AxiosError)=>{
        return Promise.reject(error);
    });
    
    // 响应拦截器
    axiosInstance.interceptors.response.use((res)=>{
        const data = res?.data;
        const result = data?.result;
        const code = result?.status
        const status = data?.status;
        const error = result?.message;
        if(status!=='success' || code === 500){
          message.error(error || '接口报错');
          return Promise.reject({data:error,error:true});
        }
        return { data:result,error:false };

    }, (error:AxiosError)=>{
        const data:any = error?.response?.data;
        message.error(data?.message || '接口报错');
        return Promise.reject({ data,error:true });
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
