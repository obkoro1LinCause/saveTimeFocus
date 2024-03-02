<template>
  <div class="header">
    <div class="has-user" v-if="userInfo">
        <div class="user-lt">
          <span class="title">SAVETIMEFOCUS</span>
        </div>
        <div class="user-rt flex">
          <a-button size="small" @click="onClick('lang')" class="mr-8">{{ lang }}</a-button>
          <a-dropdown placement="bottom">
            <UserOutlined/>
              <template #overlay>
                <a-menu @click="onMenuClick">
                  <a-menuItem key="1">
                    <span>{{ userInfo.email }}</span>
                  </a-menuItem>
                  <a-menuItem key="2">退出</a-menuItem>
                </a-menu>
              </template>
          </a-dropdown>
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
import { defineComponent, nextTick, ref, computed, onMounted,defineEmits } from "vue";
import { UserOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "Header",
  props: {
    userInfo:{
      type:Object,
      default:null
    },
  },
  setup(props, ctx) {
    const route = useRoute();
    const lang = ref('中文')
    const showEntrance = computed(()=>{
      if(route.path.includes('/app/user')) return false;
      if(!props.userInfo) return true;
    });
    const onClick = (type:string)=>{
      if(type === 'push'){
        ctx.emit('goTo');
      }else if(type == 'lang'){
        if(lang.value !== '中文'){
          lang.value = '中文';
        }else{
          lang.value = 'En';
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
      showEntrance
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