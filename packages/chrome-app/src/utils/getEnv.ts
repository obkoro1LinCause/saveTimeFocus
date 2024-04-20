import { type TEnv} from "toolkit";

type TEnv = typeof TEnv;
export default ():TEnv=>{
    let env:TEnv
    if( process.env.NODE_ENV === 'serve'){
        env = 'dev';
    }else{
        env = 'prod'
    };
    return env;
}