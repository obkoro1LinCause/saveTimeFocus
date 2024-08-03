
import { TTimezoneList } from './day';

declare class Day {
    timezoneList:TTimezoneList;
    getUtcByChina(time:Date): Date
    getTimezoneByUtc(timezoneId:string,utc:any):void;
    formatTime(format:string):string
  }