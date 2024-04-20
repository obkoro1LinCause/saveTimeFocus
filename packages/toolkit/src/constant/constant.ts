

export interface ILangKey {
    value:string,
    label:string
}
export type TLangKeys = ILangKey[];

export interface IConstants {
    langKeys:TLangKeys
}


const constants:IConstants = {
    langKeys:[
        { value: "zh", label: "简体中文" },
        { value: "en", label: "English" },
    ],
}


export default constants;