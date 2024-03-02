
import httpServices, { type HttpMethodHandler,type BackendURLKeys } from './base';


export const createService = (mode:BackendURLKeys)=>{
     const service = httpServices[mode] as HttpMethodHandler;
     return service;
}
