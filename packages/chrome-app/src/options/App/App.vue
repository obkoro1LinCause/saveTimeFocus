<template>
  <div class="app-main">
    <Header
      @goTo="gotoUser"
      @setLang="setLang"
      :userInfo="userInfo"
      @menuClick="menuClick"
    ></Header>
    <div class="app-body">
      <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
        <router-view></router-view>
      </a-config-provider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  getCurrentInstance,
  provide,
  watch,
  onMounted,
} from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { userLogout } from "../../service/domain/user";
import Header from "./component/header.vue";
import Siderbar from "./component/siderbar.vue";
import { useUserStore } from "../App/stores/user";
import i18n, { useI18n } from "@/locales";
import { message } from "ant-design-vue";

import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const { appContext }: any = getCurrentInstance();
const configMethods = appContext.config.globalProperties;

const router = useRouter();
const route = useRoute();
const currentRoute = router.currentRoute;
const userStore = useUserStore();
const { tm, locale } = useI18n();


const tooltipContent = ref();
const userInfo = computed(() => {
  return userStore.userInfo;
});

const gotoUser = () => {
  router.push({
    name: "LoginOrSignPage",
    params: {
      lang: locale.value,
    },
  });
};

const setLang = (lang) => {
  locale.value = lang;
  localStorage.setItem("lang", lang);
  document.querySelector("html").setAttribute("lang", lang);
  const currentRouteName = route.name;
  router.push({
    name: currentRouteName,
    params: {
      lang: locale.value,
    },
  });
};

const menuClick = async (e) => {
  try {
    const { key } = e;
    if (key == 2) {
      const ret: any = await userLogout();
      if (ret.error) return;
      userStore.setUser(null);
      gotoUser();
      message.success(tm("logoutSuccess"));
      // location.reload();
    }
  } catch (err) {
    message.error(err?.data);
    location.reload();
    return err;
  }
};

// // 路由重定向
// watch(()=>route,(nv)=>{
//     const lang:any = nv?.params?.lang;
//     if(!lang || !['zh','en'].includes(lang)){
//         router.push({
//             name:'LifePage',
//             params:{
//                 lang:locale.value,
//             }
//         })
//     }
// },{immediate:true})
</script>


<style scoped>
.app-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app-body {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
