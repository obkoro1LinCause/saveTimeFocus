import { createService,Utils } from "@toolkit";

let mode:any = Utils.getEnv();
const  service = createService(mode);

export default service;
export { mode };




