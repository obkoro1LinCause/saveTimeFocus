<template>
  <div class="header">
    <div class="has-user" v-if="userInfo">
        <div class="user-lt">
          <span class="title">SAVETIMEFOCUS</span>
        </div>
        <div class="user-rt flex">
          <a-dropdown placement="bottom">
              <div>
                <UserOutlined :style="{fontSize: '18px', color: '#08c'}"/>
                <span>{{userInfo?.name}}</span>
              </div>
              <template #overlay>
                <a-menu @click="onMenuClick">
                  <a-menuItem key="1">
                    <span>{{ userInfo.email }}</span>
                  </a-menuItem>
                  <a-menuItem key="2">{{ tm('exit') }}</a-menuItem>
                </a-menu>
              </template>
          </a-dropdown>
          <a-button size="small" @click="onClick('lang')" class="ml-8">{{ lang }}</a-button>
        </div>
    </div>
    <div class="none-user" v-else>
      <div class="user-lt">
          <span class="title">SAVETIMEFOCUS</span>
          <span 
            v-if="showEntrance"
            @click="onClick('push')" style="color:red"
          >登录 ｜ 注册</span>
      </div>
      <div class="user-rt">
         <a-button size="small" @click="onClick('lang')">{{ lang }}</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, computed, onMounted,defineEmits,getCurrentInstance } from "vue";
import { UserOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { useI18n } from '@/locales';

export default defineComponent({
  name: "Header",
  components:{UserOutlined},
  props: {
    userInfo:{
      type:Object,
      default:null
    },
  },
  setup(props, ctx) {
    const route = useRoute();
    const { tm }:any = useI18n();
    const lang = ref(tm('lang'));
    // 展示登录｜注册
    const showEntrance = computed(()=>{
      if(route.path.includes('/app/user')) return false;
      if(!props.userInfo) return true;
      return false;
    });
    const onClick = (type:string)=>{
      if(type === 'push'){
        ctx.emit('goTo');
      }else if(type == 'lang'){
        if(lang.value !== 'zh'){
          lang.value = 'zh';
        }else{
          lang.value = 'en';
        }
        ctx.emit('setLang',lang.value)
      }
    }
    const onMenuClick = (e:any)=>{
      ctx.emit('menuClick',e);
    }
    return {
      onClick,
      lang,
      onMenuClick,
      showEntrance,
      tm
    };
  },
});

</script>

<style scoped lang="scss">
.header{
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.title{
  font-weight: 600;
  font-size: 16px;
  margin-right: 10px;
}

.has-user,.none-user{
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-lt{
  cursor: pointer;
}
.user-rt{
  align-items: center;
}
</style>