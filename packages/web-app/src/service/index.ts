import { createService,Utils } from "@bs/component";

let mode:any = Utils.getEnv();
const  service = createService(mode);

export default service;
export { mode };




