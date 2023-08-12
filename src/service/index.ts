import httpServices, { type HttpMethodHandler,BackendURLKeys } from './base';

let mode:BackendURLKeys = 'dev';
if(process.env.NODE_ENV === 'serve'){
    mode = 'dev'
}else{
    mode = 'prod';
}


const service = httpServices[mode] as HttpMethodHandler;

export default service;