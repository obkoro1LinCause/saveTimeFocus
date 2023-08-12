import asyncPluginDataInstance from './asyncPluginData';
import listenerEventInstance from './listenerEvent';

function main() {
    // 插件安装或者升级后更新数据
    asyncPluginDataInstance.run();
    // 监听任务
    listenerEventInstance.run();
    console.log('backgroud.js loaded')
}

main();
