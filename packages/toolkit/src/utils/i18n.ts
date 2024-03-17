import { createI18n,useI18n, } from 'vue-i18n';
import { getCnMap, getEnMap } from '../fetch';



export const langKeys = [
  { value: "zh", label: "简体中文" },
  { value: "en", label: "English" },
];

export const initVueI18n = (url:string)=>{
  const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
  return new Promise((resolve,reject)=>{
    Promise.all([getCnMap(url),getEnMap(url)]).then(([zh,en]:any)=>{
      const messages = {zh,en};
      const i18n = createI18n({
        locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
        fallbackLocale: 'zh', // 设置备用语言
        messages, 
        globalInjection:true,
        legacy:false,
        allowComposition:true
      })
      resolve({ i18n,useI18n });
    }).catch(err=>{
      const i18n = createI18n({
        locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
        fallbackLocale: 'zh', // 设置备用语言
        messages:{},
        globalInjection:true,
        legacy:false
      })
      resolve({ i18n,useI18n });
      console.log('初始化VueI18n失败',err);
      return err;
    });
  })
}