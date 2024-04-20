
interface IApi {
    getEnMap<T>(url:string):Promise<T>;
    getCnMap<T>(url:string):Promise<T>;
}

const api:IApi = {
    getEnMap:async (url:string)=>{
        const response = await fetch(url+'/en.json');
        return await response.json();
    },
    getCnMap:async (url:string)=>{
        const response = await fetch(url+'/cn.json');
        return await response.json();
    }
}

export default api;