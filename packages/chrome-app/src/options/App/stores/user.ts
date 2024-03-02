import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


// 通过localStorage来数据持久化
export const useUserStore = defineStore('user', () => {
  const setUserToken = (token:string)=>{
    localStorage.setItem('user-token',token);
  }
  return { 
    setUserToken
  }
})
