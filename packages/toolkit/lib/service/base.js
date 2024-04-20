"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainURLEnum = void 0;
var axios_1 = __importDefault(require("axios"));
;
//后端服务
var domainURLEnum;
(function (domainURLEnum) {
    domainURLEnum["dev"] = "http://localhost:8010";
    domainURLEnum["test"] = "";
    domainURLEnum["stg"] = "";
    domainURLEnum["prod"] = "";
})(domainURLEnum || (exports.domainURLEnum = domainURLEnum = {}));
var httpServices = {};
function createService(suffixURL) {
    if (suffixURL === void 0) { suffixURL = ''; }
    var newURL = "".concat(suffixURL);
    var config = {
        baseURL: newURL,
        timeout: 60000
    };
    var axiosInstance = axios_1.default.create(config);
    // 请求拦截器
    axiosInstance.interceptors.request.use(function (config) {
        var token = localStorage.getItem('user-token');
        if (!token)
            return config;
        config.headers.Authorization = "Bearer ".concat(token);
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    // 响应拦截器
    axiosInstance.interceptors.response.use(function (res) {
        var data = res === null || res === void 0 ? void 0 : res.data;
        var status = data === null || data === void 0 ? void 0 : data.status;
        var result = data === null || data === void 0 ? void 0 : data.result;
        if (status !== 'success') {
            var error = data === null || data === void 0 ? void 0 : data.error;
            return Promise.reject({ data: error, error: true });
        }
        return { data: result, error: false };
    }, function (error) {
        var _a;
        var data = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data;
        console.log('=1=1=1=');
        return Promise.reject({ data: data === null || data === void 0 ? void 0 : data.error, error: true });
    });
    return {
        get: function (url, data, options) {
            return axiosInstance.get(url, __assign({ params: data }, options));
        },
        post: function (url, data, options) {
            return axiosInstance.post(url, data, options);
        },
        delete: function (url, data, options) {
            return axiosInstance.delete(url, __assign({ params: data }, options));
        },
        put: function (url, data, options) {
            return axiosInstance.put(url, data, options);
        }
    };
}
function initServices() {
    for (var _i = 0, _a = Object.entries(domainURLEnum); _i < _a.length; _i++) {
        var entry = _a[_i];
        var _b = entry, key = _b[0], url = _b[1];
        httpServices[key] = createService(url);
    }
}
initServices();
exports.default = httpServices;
