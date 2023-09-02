import { createService,type BackendURLKeys,getEnv } from "@bs/component";

let mode:BackendURLKeys = getEnv();
const  service = createService(mode);

export default service;
export { mode };




