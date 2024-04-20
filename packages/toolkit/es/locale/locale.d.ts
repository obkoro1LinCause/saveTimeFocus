import { TEnv } from '../env/env';
type TInitLocale = <T>(env: TEnv) => Promise<T>;
declare const initLocale: TInitLocale;
export default initLocale;
