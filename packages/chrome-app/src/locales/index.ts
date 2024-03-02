import { mode } from '@/service/index';
import  { Utils,domainURLEnum } from '@toolkit';

const i18n:any = await Utils.initVueI18n(domainURLEnum[mode]);
export default i18n;
