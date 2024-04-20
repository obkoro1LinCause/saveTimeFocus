import httpServices from './base';
var createService = function (mode) {
    return httpServices[mode];
};
export default createService;
