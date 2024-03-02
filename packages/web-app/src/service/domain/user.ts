import service from '../index';

export const userLogin = (params:any)=>{
    return service.post('/focus_sys/user_login',params)
}


export const userLogout = (params:any)=>{
    return service.get(`/focus_sys/user_logout?email=${params.email}`);
}

export const userRegister = (params:any)=>{
    return service.post('/focus_sys/user_register',params);
}

export const userChangePassword = (params:any)=>{
    return service.post('/focus_sys/user_change_password',params);
}


export const userSendEmail = (params:any)=>{
    return service.get(`/focus_sys/user_email_code?email=${params.email}`)
}

export const userList = ()=>{
    return service.get('/focus_sys/user_list');
}

export const userInfo = (params:any)=>{
    return service.post(`/focus_sys/user`,params);
}

export const userInfoByToken = (params:any)=>{
    return service.get(`/focus_sys/user_by_token?token=${params.token}`);
}



