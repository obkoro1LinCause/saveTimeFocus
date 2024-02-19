export const getEnv = ()=>{
    const { hostname } = window.location;
    if (hostname.indexOf('-dev') >= 0 || hostname.indexOf('localhost') >= 0 || hostname.indexOf('127.0.0.1') >= 0 || hostname.indexOf('10.') >= 0) {
        return 'dev';
    }
    if (hostname.indexOf('-test') >= 0) {
        return 'test';
    }
    return 'prod';
}