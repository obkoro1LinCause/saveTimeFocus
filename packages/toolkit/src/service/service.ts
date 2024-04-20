
import httpServices, { type HttpMethodHandler,type BackendURLKeys } from './base';

const createService = (mode:BackendURLKeys)=>{
     return httpServices[mode] as HttpMethodHandler;
};

export default createService;