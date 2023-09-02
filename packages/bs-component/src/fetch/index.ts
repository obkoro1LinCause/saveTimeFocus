export const getEnMap = async (url:string)=>{
    const response =  await fetch(url+'/en.json');
    return await response.json();
}

export const getCnMap = async (url:string)=>{
    const  response = await fetch(url+'/cn.json');
    return await response.json();
}