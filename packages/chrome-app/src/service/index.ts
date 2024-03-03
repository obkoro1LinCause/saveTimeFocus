import { createService,Utils } from "@toolkit";

let mode:any = Utils.getEnv('chrome');
const  service = createService(mode);

export default service;
export { mode };




