import { createService,BackendURLKeys } from "@bs/component";
let mode:BackendURLKeys = 'dev';
if(process.env.NODE_ENV === 'serve'){
    mode = 'dev'
}else{
    mode = 'prod';
}
const  service = createService(mode);

export default service;
export { mode };




