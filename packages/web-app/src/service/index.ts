import { createService,Utils } from "@toolkit";

let mode:any = Utils.getEnv('web');
const  service = createService(mode);

export default service;
export { mode };




