import service from '../index';

export const getEnMap = ()=>{
    return service.get('/en.json')
}

export const getCnMap = ()=>{
    return service.get('/cn.json')
}