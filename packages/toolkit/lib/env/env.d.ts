export type TEnv = 'dev' | 'test' | 'prod';
export type TGetEnv = () => TEnv;
declare const getEnv: TGetEnv;
export default getEnv;
