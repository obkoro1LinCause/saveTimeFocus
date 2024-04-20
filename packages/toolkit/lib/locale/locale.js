"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_i18n_1 = require("vue-i18n");
var api_1 = __importDefault(require("../api/api"));
var base_1 = require("../service/base");
var initLocale = function (env) {
    var language = (navigator.language || 'en').toLocaleLowerCase(); // 这是获取浏览器的语言
    return new Promise(function (resolve) {
        Promise.all([api_1.default.getCnMap(base_1.domainURLEnum[env]), api_1.default.getEnMap(base_1.domainURLEnum[env])]).then(function (_a) {
            var zh = _a[0], en = _a[1];
            var messages = { zh: zh, en: en };
            var i18n = (0, vue_i18n_1.createI18n)({
                locale: localStorage.getItem('lang') || language.split('-')[0] || 'en',
                fallbackLocale: 'zh',
                messages: messages,
                globalInjection: true,
                legacy: false,
                allowComposition: true
            });
            return resolve({ i18n: i18n, useI18n: vue_i18n_1.useI18n });
        }).catch(function (err) {
            var i18n = (0, vue_i18n_1.createI18n)({
                locale: localStorage.getItem('lang') || language.split('-')[0] || 'en',
                fallbackLocale: 'zh',
                messages: {},
                globalInjection: true,
                legacy: false
            });
            resolve({ i18n: i18n, useI18n: vue_i18n_1.useI18n });
            console.log('初始化VueI18n失败', err);
            return err;
        });
    });
};
exports.default = initLocale;
