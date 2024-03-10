import { mode } from '@/service/index';
import  { Utils,domainURLEnum } from '@toolkit';

const { i18n,useI18n }:any = await Utils.initVueI18n(domainURLEnum[mode]);
export default i18n;

export {
    useI18n
}
