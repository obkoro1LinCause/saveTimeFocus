


import { createI18n, useI18n } from 'vue-i18n';
import zhCN from './languages/zh-CN.js';
import enUS from './languages/en-US.js';

type TInitLocale = <T>()=>Promise<T>;
type TResolve = ({ i18n,useI18n }:any)=>void;

const initLocale:TInitLocale = <T>():Promise<T>=>{
  const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
  return new Promise((resolve:TResolve)=>{
      const i18n = createI18n({
        locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
        fallbackLocale: 'en', // 设置备用语言
        messages:{
          zh:zhCN,
          en:enUS
        }, 
        globalInjection:true,
        legacy:false,
        allowComposition:true
      })
      return resolve({ i18n:i18n,useI18n:useI18n });
  })
}


export default initLocale;

