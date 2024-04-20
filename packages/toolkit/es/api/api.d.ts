interface IApi {
    getEnMap<T>(url: string): Promise<T>;
    getCnMap<T>(url: string): Promise<T>;
}
declare const api: IApi;
export default api;
