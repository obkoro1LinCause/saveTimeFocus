import { type HttpMethodHandler, type BackendURLKeys } from './base';
declare const createService: (mode: BackendURLKeys) => HttpMethodHandler;
export default createService;
