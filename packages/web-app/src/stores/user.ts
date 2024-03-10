import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userInfoByToken } from '@/service/domain/user';

// 通过localStorage来数据持久化
export const useUserStore = defineStore('user', () => {
  const userInfo = ref();

  const getUserInfo = async (token:string | undefined | null)=>{
    try{
      if(token == 'undefined' || token == 'null' || !token) return  null;
      const ret:any = await userInfoByToken({token});
      if(!ret.error) return ret?.data;
      return null;
    }catch(err){
      return null;
    }
  }

  const setUser = (value:any)=>{
    userInfo.value = value;
  }
  return { 
    setUser,
    userInfo,
    getUserInfo
  }
})
