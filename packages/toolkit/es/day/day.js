import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
var timezoneList = [
    {
        timezoneCn: '国际日期变更线西',
        timezoneEn: 'UTC-12:00',
        timezoneId: 'Etc/GMT+12'
    },
    {
        timezoneCn: '协调世界时-11',
        timezoneEn: 'UTC-11:00',
        timezoneId: 'Etc/GMT+11'
    },
    {
        timezoneCn: '夏威夷',
        timezoneEn: 'UTC-10:00',
        timezoneId: 'Pacific/Honolulu'
    },
    {
        timezoneCn: '安克雷奇',
        timezoneEn: 'UTC-09:00',
        timezoneId: 'America/Anchorage'
    },
    {
        timezoneCn: '下加利福尼亚州',
        timezoneEn: 'UTC-08:00',
        timezoneId: 'America/Santa_Isabel'
    },
    {
        timezoneCn: '太平洋时间',
        timezoneEn: 'UTC-08:00',
        timezoneId: 'America/Los_Angeles'
    },
    {
        timezoneCn: '奇瓦瓦,拉巴斯,马萨特兰',
        timezoneEn: 'UTC-07:00',
        timezoneId: 'America/Chihuahua'
    },
    {
        timezoneCn: '亚利桑那',
        timezoneEn: 'UTC-07:00',
        timezoneId: 'America/Phoenix'
    },
    {
        timezoneCn: '山地时间（美国和加拿大）',
        timezoneEn: 'UTC-07:00',
        timezoneId: 'America/Denver'
    },
    {
        timezoneCn: '中美洲',
        timezoneEn: 'UTC-06:00',
        timezoneId: 'America/Guatemala'
    },
    {
        timezoneCn: '中部时间（美国和加拿大）',
        timezoneEn: 'UTC-06:00',
        timezoneId: 'America/Chicago'
    },
    {
        timezoneCn: '萨斯喀彻温',
        timezoneEn: 'UTC-06:00',
        timezoneId: 'America/Regina'
    },
    {
        timezoneCn: '瓜达拉哈拉,墨西哥城,蒙特雷',
        timezoneEn: 'UTC-06:00',
        timezoneId: 'America/Mexico_City'
    },
    {
        timezoneCn: '波哥大,利马,基多',
        timezoneEn: 'UTC-05:00',
        timezoneId: 'America/Bogota'
    },
    {
        timezoneCn: '印地安那州（东部）',
        timezoneEn: 'UTC-05:00',
        timezoneId: 'America/Indiana/Indianapolis'
    },
    {
        timezoneCn: '东部时间（美国和加拿大）',
        timezoneEn: 'UTC-05:00',
        timezoneId: 'America/New_York'
    },
    {
        timezoneCn: '加拉加斯',
        timezoneEn: 'UTC-04:30',
        timezoneId: 'America/Caracas'
    },
    {
        timezoneCn: '大西洋时间（加拿大）',
        timezoneEn: 'UTC-04:00',
        timezoneId: 'America/Halifax'
    },
    {
        timezoneCn: '亚松森',
        timezoneEn: 'UTC-04:00',
        timezoneId: 'America/Asuncion'
    },
    {
        timezoneCn: '乔治敦,拉巴斯,马瑙斯,圣胡安',
        timezoneEn: 'UTC-04:00',
        timezoneId: 'America/La_Paz'
    },
    {
        timezoneCn: '库亚巴',
        timezoneEn: 'UTC-04:00',
        timezoneId: 'America/Cuiaba'
    },
    {
        timezoneCn: '圣地亚哥',
        timezoneEn: 'UTC-04:00',
        timezoneId: 'America/Santiago'
    },
    {
        timezoneCn: '纽芬兰',
        timezoneEn: 'UTC-03:30',
        timezoneId: 'America/St_Johns'
    },
    {
        timezoneCn: '巴西利亚',
        timezoneEn: 'UTC-03:00',
        timezoneId: 'America/Sao_Paulo'
    },
    {
        timezoneCn: '格陵兰',
        timezoneEn: 'UTC-03:00',
        timezoneId: 'America/Godthab'
    },
    {
        timezoneCn: '卡宴,福塔雷萨',
        timezoneEn: 'UTC-03:00',
        timezoneId: 'America/Cayenne'
    },
    {
        timezoneCn: '布宜诺斯艾利斯',
        timezoneEn: 'UTC-03:00',
        timezoneId: 'America/Argentina/Buenos_Aires'
    },
    {
        timezoneCn: '蒙得维的亚',
        timezoneEn: 'UTC-03:00',
        timezoneId: 'America/Montevideo'
    },
    {
        timezoneCn: '协调世界时-2',
        timezoneEn: 'UTC-02:00',
        timezoneId: 'Etc/GMT+2'
    },
    {
        timezoneCn: '佛得角群岛',
        timezoneEn: 'UTC-01:00',
        timezoneId: 'Atlantic/Cape_Verde'
    },
    {
        timezoneCn: '亚速尔群岛',
        timezoneEn: 'UTC-01:00',
        timezoneId: 'Atlantic/Azores'
    },
    {
        timezoneCn: '卡萨布兰卡',
        timezoneEn: 'UTC+00:00',
        timezoneId: 'Africa/Casablanca'
    },
    {
        timezoneCn: '蒙罗维亚,雷克雅未克',
        timezoneEn: 'UTC+00:00',
        timezoneId: 'Atlantic/Reykjavik'
    },
    {
        timezoneCn: '都柏林,爱丁堡,里斯本,伦敦',
        timezoneEn: 'UTC+00:00',
        timezoneId: 'Europe/London'
    },
    {
        timezoneCn: '协调世界时',
        timezoneEn: 'UTC+00:00',
        timezoneId: 'Etc/GMT'
    },
    {
        timezoneCn: '阿姆斯特丹,柏林,伯尔尼,罗马,斯德哥尔摩,维也纳',
        timezoneEn: 'UTC+01:00',
        timezoneId: 'Europe/Berlin'
    },
    {
        timezoneCn: '布鲁塞尔,哥本哈根,马德里,巴黎',
        timezoneEn: 'UTC+01:00',
        timezoneId: 'Europe/Paris'
    },
    {
        timezoneCn: '中非西部',
        timezoneEn: 'UTC+01:00',
        timezoneId: 'Africa/Lagos'
    },
    {
        timezoneCn: '贝尔格莱德,布拉迪斯拉发,布达佩斯,卢布尔雅那,布拉格',
        timezoneEn: 'UTC+01:00',
        timezoneId: 'Europe/Budapest'
    },
    {
        timezoneCn: '萨拉热窝,斯科普里,华沙,萨格勒布',
        timezoneEn: 'UTC+01:00',
        timezoneId: 'Europe/Warsaw'
    },
    {
        timezoneCn: '温得和克',
        timezoneEn: 'UTC+01:00',
        timezoneId: 'Africa/Windhoek'
    },
    {
        timezoneCn: '雅典,布加勒斯特,伊斯坦布尔',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Europe/Istanbul'
    },
    {
        timezoneCn: '赫尔辛基,基辅,里加,索非亚,塔林,维尔纽斯',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Europe/Kiev'
    },
    {
        timezoneCn: '开罗',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Africa/Cairo'
    },
    {
        timezoneCn: '大马士革',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Asia/Damascus'
    },
    {
        timezoneCn: '安曼',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Asia/Amman'
    },
    {
        timezoneCn: '哈拉雷,比勒陀利亚',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Africa/Johannesburg'
    },
    {
        timezoneCn: '耶路撒冷',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Asia/Jerusalem'
    },
    {
        timezoneCn: '贝鲁特',
        timezoneEn: 'UTC+02:00',
        timezoneId: 'Asia/Beirut'
    },
    {
        timezoneCn: '巴格达',
        timezoneEn: 'UTC+03:00',
        timezoneId: 'Asia/Baghdad'
    },
    {
        timezoneCn: '明斯克',
        timezoneEn: 'UTC+03:00',
        timezoneId: 'Europe/Minsk'
    },
    {
        timezoneCn: '利雅得',
        timezoneEn: 'UTC+03:00',
        timezoneId: 'Asia/Riyadh'
    },
    {
        timezoneCn: '内罗毕',
        timezoneEn: 'UTC+03:00',
        timezoneId: 'Africa/Nairobi'
    },
    {
        timezoneCn: '德黑兰',
        timezoneEn: 'UTC+03:30',
        timezoneId: 'Asia/Tehran'
    },
    {
        timezoneCn: '莫斯科,圣彼得堡,伏尔加格勒',
        timezoneEn: 'UTC+04:00',
        timezoneId: 'Europe/Moscow'
    },
    {
        timezoneCn: '第比利斯',
        timezoneEn: 'UTC+04:00',
        timezoneId: 'Asia/Tbilisi'
    },
    {
        timezoneCn: '埃里温',
        timezoneEn: 'UTC+04:00',
        timezoneId: 'Asia/Yerevan'
    },
    {
        timezoneCn: '阿布扎比,马斯喀特',
        timezoneEn: 'UTC+04:00',
        timezoneId: 'Asia/Dubai'
    },
    {
        timezoneCn: '巴库',
        timezoneEn: 'UTC+04:00',
        timezoneId: 'Asia/Baku'
    },
    {
        timezoneCn: '路易港',
        timezoneEn: 'UTC+04:00',
        timezoneId: 'Indian/Mauritius'
    },
    {
        timezoneCn: '喀布尔',
        timezoneEn: 'UTC+04:30',
        timezoneId: 'Asia/Kabul'
    },
    {
        timezoneCn: '塔什干',
        timezoneEn: 'UTC+05:00',
        timezoneId: 'Asia/Tashkent'
    },
    {
        timezoneCn: '斯里加亚渥登普拉',
        timezoneEn: 'UTC+05:30',
        timezoneId: 'Asia/Colombo'
    },
    {
        timezoneCn: '钦奈,加尔各答,孟买,新德里',
        timezoneEn: 'UTC+05:30',
        timezoneId: 'Asia/Kolkata'
    },
    {
        timezoneCn: '加德满都',
        timezoneEn: 'UTC+05:45',
        timezoneId: 'Asia/Kathmandu'
    },
    {
        timezoneCn: '阿斯塔纳',
        timezoneEn: 'UTC+06:00',
        timezoneId: 'Asia/Almaty'
    },
    {
        timezoneCn: '达卡',
        timezoneEn: 'UTC+06:00',
        timezoneId: 'Asia/Dhaka'
    },
    {
        timezoneCn: '叶卡捷琳堡',
        timezoneEn: 'UTC+06:00',
        timezoneId: 'Asia/Yekaterinburg'
    },
    {
        timezoneCn: '仰光',
        timezoneEn: 'UTC+06:30',
        timezoneId: 'Asia/Yangon'
    },
    {
        timezoneCn: '曼谷,河内,雅加达',
        timezoneEn: 'UTC+07:00',
        timezoneId: 'Asia/Bangkok'
    },
    {
        timezoneCn: '新西伯利亚',
        timezoneEn: 'UTC+07:00',
        timezoneId: 'Asia/Novosibirsk'
    },
    {
        timezoneCn: '克拉斯诺亚尔斯克',
        timezoneEn: 'UTC+08:00',
        timezoneId: 'Asia/Krasnoyarsk'
    },
    {
        timezoneCn: '乌兰巴托',
        timezoneEn: 'UTC+08:00',
        timezoneId: 'Asia/Ulaanbaatar'
    },
    {
        timezoneCn: '北京,重庆,香港,乌鲁木齐',
        timezoneEn: 'UTC+08:00',
        timezoneId: 'Asia/Shanghai'
    },
    {
        timezoneCn: '佩思',
        timezoneEn: 'UTC+08:00',
        timezoneId: 'Australia/Perth'
    },
    {
        timezoneCn: '吉隆坡,新加坡',
        timezoneEn: 'UTC+08:00',
        timezoneId: 'Asia/Singapore'
    },
    {
        timezoneCn: '台北',
        timezoneEn: 'UTC+08:00',
        timezoneId: 'Asia/Taipei'
    },
    {
        timezoneCn: '伊尔库茨克',
        timezoneEn: 'UTC+09:00',
        timezoneId: 'Asia/Irkutsk'
    },
    {
        timezoneCn: '首尔',
        timezoneEn: 'UTC+09:00',
        timezoneId: 'Asia/Seoul'
    },
    {
        timezoneCn: '大阪,札幌,东京',
        timezoneEn: 'UTC+09:00',
        timezoneId: 'Asia/Tokyo'
    },
    {
        timezoneCn: '达尔文',
        timezoneEn: 'UTC+09:30',
        timezoneId: 'Australia/Darwin'
    },
    {
        timezoneCn: '阿德莱德',
        timezoneEn: 'UTC+09:30',
        timezoneId: 'Australia/Adelaide'
    },
    {
        timezoneCn: '霍巴特',
        timezoneEn: 'UTC+10:00',
        timezoneId: 'Australia/Hobart'
    },
    {
        timezoneCn: '雅库茨克',
        timezoneEn: 'UTC+10:00',
        timezoneId: 'Asia/Yakutsk'
    },
    {
        timezoneCn: '布里斯班',
        timezoneEn: 'UTC+10:00',
        timezoneId: 'Australia/Brisbane'
    },
    {
        timezoneCn: '关岛,莫尔兹比港',
        timezoneEn: 'UTC+10:00',
        timezoneId: 'Pacific/Port_Moresby'
    },
    {
        timezoneCn: '堪培拉,墨尔本,悉尼',
        timezoneEn: 'UTC+10:00',
        timezoneId: 'Australia/Sydney'
    },
    {
        timezoneCn: '符拉迪沃斯托克',
        timezoneEn: 'UTC+11:00',
        timezoneId: 'Asia/Vladivostok'
    },
    {
        timezoneCn: '所罗门群岛,新喀里多尼亚',
        timezoneEn: 'UTC+11:00',
        timezoneId: 'Pacific/Guadalcanal'
    },
    {
        timezoneCn: '协调世界时+12',
        timezoneEn: 'UTC+12:00',
        timezoneId: 'Etc/GMT-12'
    },
    {
        timezoneCn: '斐济,马绍尔群岛',
        timezoneEn: 'UTC+12:00',
        timezoneId: 'Pacific/Fiji'
    },
    {
        timezoneCn: '马加丹',
        timezoneEn: 'UTC+12:00',
        timezoneId: 'Asia/Magadan'
    },
    {
        timezoneCn: '奥克兰,惠灵顿',
        timezoneEn: 'UTC+12:00',
        timezoneId: 'Pacific/Auckland'
    },
    {
        timezoneCn: '努库阿洛法',
        timezoneEn: 'UTC+13:00',
        timezoneId: 'Pacific/Tongatapu'
    },
    {
        timezoneCn: '萨摩亚群岛',
        timezoneEn: 'UTC+13:00',
        timezoneId: 'Pacific/Apia'
    }
];
var Day = /** @class */ (function () {
    function Day() {
        this.timezoneList = timezoneList;
    }
    ;
    Day.prototype.getUtcByChina = function (time) {
        return dayjs.utc(time);
    };
    Day.prototype.getTimezoneByUtc = function (timezoneId, utc) {
        return utc.tz(timezoneId);
    };
    Day.prototype.formatTime = function (format) {
        return format;
    };
    return Day;
}());
export default Day;
