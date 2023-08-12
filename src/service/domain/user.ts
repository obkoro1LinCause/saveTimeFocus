import service from '../index';

export const userLogin = (data:any)=>{
    return service.post('/user/login',data)
}

export const userRegister = (data:any)=>{
    return service.post('/user/register',data);
}