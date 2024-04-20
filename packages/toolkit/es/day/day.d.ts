import dayjs from 'dayjs';
export interface ITimezoneObject {
    timezoneCn: string;
    timezoneEn: string;
    timezoneId: string;
}
export type TTimezoneList = ITimezoneObject[];
interface IDay {
    timezoneList: TTimezoneList;
    getUtcByChina(time: Date): void;
    getTimezoneByUtc(timezoneId: string, utc: any): void;
    formatTime(format: string): string;
}
declare class Day implements IDay {
    readonly timezoneList: TTimezoneList;
    constructor();
    getUtcByChina(time: any): dayjs.Dayjs;
    getTimezoneByUtc(timezoneId: string, utc: any): any;
    formatTime(format: string): string;
}
export default Day;
