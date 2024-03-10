
import i18n from './index';

const setI18nLang  = (lang:string)=>{
    i18n.locale = lang;
    document.querySelector('html')?.setAttribute('lang', lang) // 根元素增加lang属性
    return lang;
}