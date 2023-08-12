import { utils } from '@/utils/index'
import NET from '@/utils/net'
import { versionStringCompare } from '@/utils/utils-func';

class AsyncPluginData {
  /**
   * @description: 插件安装或者升级后同步更新数据
   */
  async run() {
    await this.updateSettingOldValue()
  }

  /**
   * @description: 强制更新老的配置 避免配置错误
   */
  async updateSettingOldValue() {
    const { version } = chrome.runtime.getManifest();
  }

}

export default new AsyncPluginData()