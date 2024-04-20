declare namespace api {
    function getEnMap<T>(url:string):Promise<T>;
    function getCnMap<T>(url:string):Promise<T>;
}