import { createService } from "toolkit";
import getEnv from "@/utils/getEnv";

const env = getEnv();
const service = createService(env);

export default service;




