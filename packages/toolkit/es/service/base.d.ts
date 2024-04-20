export interface IAjaxResult<T> {
    status: 'success' | 'error';
    message: 'string';
    params: any;
    result: T;
}
export declare enum domainURLEnum {
    dev = "http://localhost:8010",
    test = "",
    stg = "",
    prod = ""
}
export type BackendURLKeys = keyof typeof domainURLEnum;
type RequestHandler = <T = any>(url: string, payload?: any, reqOption?: any) => Promise<IAjaxResult<T>>;
type HttpMethods = 'get' | 'post' | 'put' | 'delete';
export type HttpMethodHandler = Record<HttpMethods, RequestHandler>;
type HttpServices = Record<BackendURLKeys, HttpMethodHandler>;
declare const httpServices: HttpServices;
export default httpServices;
