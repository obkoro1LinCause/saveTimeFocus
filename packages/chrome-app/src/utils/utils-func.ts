/**
 * @description: 版本号比较
 * @param {type} preVersion 新版本
 * @param {type} lastVersion 旧版本
 * 1 新版本比较新
 * -1 旧版本比较新
 * 0 版本号相等
 */
export function versionStringCompare(preVersion:any, lastVersion:any) {
    const sources = preVersion?.split('.')
    const dests = lastVersion?.split('.')
    const maxL = Math.max(sources.length, dests.length)
    let result = 0
    for (let i = 0; i < maxL; i += 1) {
      const preValue = sources.length > i ? sources[i] : 0
      const preNum = Number.isNaN(Number(preValue)) ? preValue?.charCodeAt() : Number(preValue)
      const lastValue = dests.length > i ? dests[i] : 0
      const lastNum = Number.isNaN(Number(lastValue)) ? lastValue?.charCodeAt() : Number(lastValue)
      if (preNum < lastNum) {
        result = -1
        break
      } else if (preNum > lastNum) {
        result = 1
        break
      }
    }
    return result
  }