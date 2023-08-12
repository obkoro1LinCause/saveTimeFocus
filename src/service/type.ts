export const statusMap = {
    400:'请求被拒绝',
    401:'鉴权失败，无权限/验证异常',
    403:'权限不足',
    404:'资源不存在',
    500:'服务出错了',
    200:'接口正常'
}

export const codeMap = {
  "ERR_BAD_REQUEST":"",
}

/**
 * {
  "status": "success",
  "message": "post login succeed",
  "params": {
    "url": "/user/login",
    "method": "POST",
    "routes": {}
  },
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE4NzUwMDkwMzYyQDE2My5jb20iLCJwYXNzd29yZCI6IjFxYXoiLCJpYXQiOjE2OTE1NjgwMDh9.DR2_5gjDlsycNsopUYd4OEL3LFaCAWb4voZvD6FD-GQ",
    "email": "18750090362@163.com"
  }
}
*/

export interface AjaxResult<T>{
    status:'success' | 'error',
    message:'string',
    params:any,
    result:T,
}