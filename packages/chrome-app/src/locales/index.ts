import { mode } from '@/service/index';
import { initVueI18n,domainURLEnum } from '@bs/component';

const i18n:any = await initVueI18n(domainURLEnum[mode]);
export default i18n;
