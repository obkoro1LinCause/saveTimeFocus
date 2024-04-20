export interface ILangKey {
    value: string;
    label: string;
}
export type TLangKeys = ILangKey[];
export interface IConstants {
    langKeys: TLangKeys;
}
declare const constants: IConstants;
export default constants;
