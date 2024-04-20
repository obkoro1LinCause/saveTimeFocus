import service from '../index';

export const userLogin = (params:any)=>{
    return service.post('/focus_sys/user_login',params)
}


export const userLogout = ()=>{
    return service.get(`/focus_sys/user_logout`);
}

export const userRegister = (params:any)=>{
    return service.post('/focus_sys/user_register',params);
}

export const userChangePassword = (params:any)=>{
    return service.post('/focus_sys/change_password',params);
}


export const userSendEmail = (params:any)=>{
    return service.get(`/focus_sys/email_code?email=${params.email}`)
}

export const userList = ()=>{
    return service.get('/focus_sys/user_list');
}

export const userInfo = (params:any)=>{
    return service.post(`/focus_sys/user`,params);
}

export const getCurrentUser = ()=>{
    return service.get(`/focus_sys/current_user`);
}



