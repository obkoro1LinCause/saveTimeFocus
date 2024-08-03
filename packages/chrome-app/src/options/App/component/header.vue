<template>
  <div class="header">
    <div class="has-user" v-if="userInfo">
      <div class="user-lt">
        <span class="title">SAVETIMEFOCUS</span>
        <span>{{ userInfo.email }}</span>
      </div>
      <div class="user-rt flex">
        <a-dropdown placement="bottom" class="mr-6">
          <template #overlay>
            <a-menu @click="onMenuClick">
              <a-menuItem key="2">{{ tm("logout") }}</a-menuItem>
            </a-menu>
          </template>
          <a-button size="small">
             <span>{{ userInfo?.name || 'XXX' }}</span>
             <UserOutlined :style="{ fontSize: '16px', color: '#08c' }" />
          </a-button>
        </a-dropdown>
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item v-for="item in langList" :key="item.key">
                <span>{{ item.value }}</span>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button size="small"> {{ langText }}<DownOutlined /></a-button>
        </a-dropdown>
      </div>
    </div>
    <div class="none-user" v-else>
      <div class="user-lt">
        <span class="title">SAVETIMEFOCUS</span>
        <span @click="onClick('push')" style="color: red" v-if="showEntrance">{{ tm('loginOrSign')}}</span>
      </div>
      <div class="user-rt">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item v-for="item in langList" :key="item.key">
                <span>{{ item.value }}</span>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>{{ langText }}<DownOutlined /></a-button>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  ref,
  computed,
  onMounted,
  defineEmits,
  getCurrentInstance,
} from "vue";
import { UserOutlined,DownOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { useI18n } from "@/locales";

export default defineComponent({
  name: "Header",
  components: { UserOutlined,DownOutlined },
  props: {
    userInfo: {
      type: Object,
      default: null,
    },
  },
  setup(props, ctx) {
    const route = useRoute();
    const { tm }  = useI18n();

    const langList = ref([
      {
        value: "English",
        key:'en'
      },
      {
        value: "中文",
        key:'zh'
      },
    ]);

    const langText = computed(()=>{
      return langList.value.find((item)=>item.key === tm("lang"))?.value
    })

    // 展示登录｜注册
    const showEntrance = computed(() => {
      if (route.path.includes("/app/user")) return false;
      if (!props.userInfo) return true;
      return false;
    });

    const handleMenuClick = (item:any) => {
      ctx.emit("setLang", item.key);
    };
    const onClick = (type: string) => {
      ctx.emit("goTo");
    };
    const onMenuClick = (e:any) => {
      ctx.emit("menuClick", e);
    };
    return {
      onClick,
      onMenuClick,
      showEntrance,
      tm,
      langList,
      langText,
      handleMenuClick,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.title {
  font-weight: 600;
  font-size: 16px;
  margin-right: 10px;
}

.has-user,
.none-user {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-lt {
  cursor: pointer;
}
.user-rt {
  align-items: center;
}
</style>