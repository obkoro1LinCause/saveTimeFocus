import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUser } from '@/service/domain/user';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref();

  const getUserInfo = async ()=>{
    try{
      const ret:any = await getCurrentUser();
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
