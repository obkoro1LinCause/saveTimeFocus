/**
 * 后台监听事件通信
 * 
 */

import { utils } from '@/utils/index'
import NET from '@/utils/net';

class ListenerEvent {
  run() {
    this.addListener()
  }

  addListener() {
    console.log('第一次安装',chrome,chrome.runtime.OnInstalledReason.INSTALL)
    // 第一次安装
    chrome.runtime.onInstalled.addListener((res) => {
      if (res.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        utils.jumpUrl(NET.OPTIONSPAGE)
      }
    });
    
    // chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    //   console.log(msg, sender);
    //   response();
    // });
    
  }
}
export default new ListenerEvent();