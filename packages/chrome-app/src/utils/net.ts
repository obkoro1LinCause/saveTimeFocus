
interface ChromeOptions {
  name:string,
  id?:string | number,
  extensionName:string,
  downloadUrl:string,
  optionsUrl:string,
}


interface NetInterface {
  GITHUBREPO:string,
  GITHUB_REPO_ISSUES:string,
  DOCS:string,
  RELEASES:string,
  GITHUBSITE:string,
  MYSITE:string,
  OPTIONSPAGE:string,
  CHROMESTORE:string,
  NAVIGATOR_OPTIONS:ChromeOptions,

}


function getNavigatorOptions():ChromeOptions {
    // 转小写
    const mode = process.env.VUE_APP_MODE.toLowerCase();
    if (mode.indexOf('firefox') >= 0) {
      // 打开火狐options的id
      const FIREFOX_UUID = '17ce4bd7-60f8-432c-9848-a61dd819bc06'
      // 本地调试火狐的id
      const optionsUrl = window.browser.extension.getURL('options.html');
      console.log(optionsUrl,'--optionsUrl--')
      return {
        name: 'Firefox',
        optionsUrl,
        id: FIREFOX_UUID, // serve
        extensionName: 'moz-extension',
        downloadUrl: 'https://addons.mozilla.org/zh-CN/firefox/addon/stop-mess-around1/',
      }
    }
  
    const chromeOptions:ChromeOptions = {
      name: 'Chrome',
      id: chrome.runtime.id, // serve
      extensionName: 'chrome-extension',
      downloadUrl: 'https://chrome.google.com/webstore/detail/stop-mess-around/gbjbkekbbjbieijpebieifkmahlagncm/related?hl=zh-CN',
      optionsUrl:'',
    }
    if (mode.indexOf('edge') >= 0) {
      chromeOptions.name = 'Edge'
      chromeOptions.downloadUrl = 'https://microsoftedge.microsoft.com/addons/detail/stopmessaround/mdiafefnlaaefmfgjbeejpppkdhghmaj'
    }
    chromeOptions.optionsUrl = `${chromeOptions.extensionName}://${chromeOptions.id}/options.html`
  
    // 包含edge
    return chromeOptions
  }
  
  const NavigatorOptions = getNavigatorOptions() || {}

  
  const NET: NetInterface = {
    // 项目地址
    GITHUBREPO: 'https://github.com/OBKoro1/stop-mess-around',
    GITHUB_REPO_ISSUES: 'https://github.com/OBKoro1/stop-mess-around/issues',
    // 使用文档
    DOCS: 'https://github.com/OBKoro1/stop-mess-around/wiki/%E5%8A%9F%E8%83%BD%E7%A4%BA%E4%BE%8B%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E',
    // 更新日志
    RELEASES: 'https://github.com/OBKoro1/stop-mess-around/blob/master/CHANNGELOG.md',
    // github 地址
    GITHUBSITE: 'https://github.com/OBKoro1',
    // 我的github地址
    MYSITE: 'http://obkoro1.com/web_accumulate/about.html',
    // 插件配置面板页面
    OPTIONSPAGE: NavigatorOptions.optionsUrl,
    //   MYSITE: 'https://github.com/OBKoro1',
    // 谷歌应用市场
    CHROMESTORE: NavigatorOptions.downloadUrl,
    NAVIGATOR_OPTIONS: NavigatorOptions,
  }
  
  export default NET;