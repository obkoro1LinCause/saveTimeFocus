import { createI18n, useI18n } from 'vue-i18n';
import api from '../api/api';
import { domainURLEnum } from '../service/base';
var initLocale = function (env) {
    var language = (navigator.language || 'en').toLocaleLowerCase(); // 这是获取浏览器的语言
    return new Promise(function (resolve) {
        Promise.all([api.getCnMap(domainURLEnum[env]), api.getEnMap(domainURLEnum[env])]).then(function (_a) {
            var zh = _a[0], en = _a[1];
            var messages = { zh: zh, en: en };
            var i18n = createI18n({
                locale: localStorage.getItem('lang') || language.split('-')[0] || 'en',
                fallbackLocale: 'zh',
                messages: messages,
                globalInjection: true,
                legacy: false,
                allowComposition: true
            });
            return resolve({ i18n: i18n, useI18n: useI18n });
        }).catch(function (err) {
            var i18n = createI18n({
                locale: localStorage.getItem('lang') || language.split('-')[0] || 'en',
                fallbackLocale: 'zh',
                messages: {},
                globalInjection: true,
                legacy: false
            });
            resolve({ i18n: i18n, useI18n: useI18n });
            console.log('初始化VueI18n失败', err);
            return err;
        });
    });
};
export default initLocale;
