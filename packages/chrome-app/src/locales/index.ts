import { initLocale,constants } from 'toolkit';
import getEnv from "@/utils/getEnv";

const langKeys = constants.langKeys;
const env = getEnv();

const { i18n,useI18n } = await initLocale(env);

export default i18n;
export { useI18n,langKeys };

