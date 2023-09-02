
import { App } from 'vue';
import NET from '@/utils/net';



export const utils = {
  /**
   * @description: 打开新页面
   * @param {type} url
   */
  jumpUrl(url:string) {
    chrome.tabs.create({url});
  },
   /**
   * @description 获取storage数据
   * @param * key
   */
   getChromeStorage(key:string) {
    return new Promise((resolve:any,reject:any) => {
      chrome.storage.local.get([key], (res) => {
        try{
          let result = res[key]
          // 取到值 则还原给数组/对象 抛出去 否则就抛出去undefined
          if (result !== undefined) {
            result = JSON.parse(result)
          }
          resolve(result)
        }catch(err){
          reject('chrome get fail!')
        }
      })
    })
  },
   /**
   * @description: 更新数据
   * @param {type} val
   * @param {type} key
   */
   updateStorageData(val:any, key:string) {
    return new Promise((resolve:any,reject:any) => {
      try{
        const str = JSON.stringify(val)
        chrome.storage.local.set({ [key]: str }, () => {
          resolve();
        })
      }catch(err){
        reject('chrome update fail!');
      }
      
    })
  },
}

export default {
  install: (app:App, options?:any) => {
    app.config.globalProperties.NET = NET;
    app.config.globalProperties.$utils = utils;
    console.log("我的第一个插件",options);
  }
};
