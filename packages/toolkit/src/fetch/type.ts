export const statusErrMap:any = {
  400:'请求被拒绝',
  401:'鉴权失败，无权限/验证异常',
  403:'权限不足',
  404:'资源不存在',
  500:'服务出错了'
}

export interface AjaxResult<T>{
    status:'success' | 'error',
    message:'string',
    params:any,
    result:T,
}