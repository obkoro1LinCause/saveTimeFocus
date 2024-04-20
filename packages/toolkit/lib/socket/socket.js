"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var SocketClient = /** @class */ (function () {
    function SocketClient(options) {
        var _this = this;
        this.connected = false;
        var errorFn = options.errorFn, connectedFn = options.connectedFn, serverUrl = options.serverUrl;
        if (this.socket && this.socket.connected)
            return;
        this.socket = (0, socket_io_client_1.default)(serverUrl, options);
        // 监听事件
        this.socket.on('connect', function () {
            _this.connected = true;
            connectedFn === null || connectedFn === void 0 ? void 0 : connectedFn();
        });
        this.socket.on('error', function (error) {
            errorFn === null || errorFn === void 0 ? void 0 : errorFn(error);
        });
        this.socket.on('disconnect', function (reason) {
            console.log('Disconnected from WebSocket server:', reason);
            // 如果断开原因不是客户端主动关闭连接，尝试重新连接
            if (reason !== 'io client disconnect') {
                _this.reconnectWithBackoff();
            }
        });
        // 添加在线/离线事件监听，以便在网络连接恢复正常后自动重新连接
        window.addEventListener('online', function () {
            console.log('Network connection restored, attempting to reconnect...');
            if (_this.socket && _this.socket.disconnected) {
                _this.reconnectWithBackoff();
            }
            else {
                _this.connect();
            }
        });
        window.addEventListener('offline', function () {
            console.log('网络连接已断开！');
            if (_this.socket && _this.socket.disconnected) {
                _this.socket.connect();
            }
        });
    }
    SocketClient.prototype.connect = function () {
        if (!this.connected)
            return;
        this.socket.connect();
    };
    SocketClient.prototype.reconnectWithBackoff = function (maxDelay, initialDelay, delayFactor) {
        var _this = this;
        if (maxDelay === void 0) { maxDelay = 30000; }
        if (initialDelay === void 0) { initialDelay = 1000; }
        if (delayFactor === void 0) { delayFactor = 2; }
        var delay = initialDelay;
        var reconnectAttempt = function () {
            console.log("Attempting to reconnect in ".concat(delay, "ms..."));
            setTimeout(function () {
                if (_this.socket && _this.socket.disconnected) {
                    _this.socket.connect();
                    delay = Math.min(maxDelay, delay * delayFactor);
                    _this.socket.on('connect', function () {
                        delay = initialDelay; // 重置延迟时间
                    });
                    reconnectAttempt();
                }
            }, delay);
        };
        reconnectAttempt();
    };
    SocketClient.prototype.on = function () { };
    SocketClient.prototype.emit = function () { };
    return SocketClient;
}());
exports.default = SocketClient;
