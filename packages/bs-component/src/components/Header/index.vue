<template>
  <div class="header">
    <div class="has-user" v-if="userInfo">
        <div class="user-lt" @click="onClick('push')">
          <span>SAVETIMEFOCUS</span>
        </div>
        <div class="user-rt flex">
          <Button size="small" @click="onClick('lang')" class="mr-8">{{ lang }}</Button>
          <Dropdown placement="bottom">
            <UserOutlined/>
              <template #overlay>
                <Menu>
                  <MenuItem>
                    <span>{{ userInfo.email }}</span>
                  </MenuItem>
                </Menu>
              </template>
          </Dropdown>
        </div>
    </div>
    <div class="none-user" v-else>
        <Button size="small" @click="onClick('lang')">{{ lang }}</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, computed, onMounted,defineEmits } from "vue";
import { Button,Menu,MenuItem,Dropdown } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: "BHeader",
  props: {
    userInfo:Object,
  },
  components: {
    Button,
    UserOutlined,
    Menu,MenuItem,Dropdown
  },
  setup(props, ctx) {

    const lang = ref('中文')
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
    return {
      onClick,
      lang
    };
  },
});
</script>

<style scoped>
.header{
    width: 100%;
    border-bottom: 1px solid #ccc;
}
.has-user{
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
.none-user{
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}
</style>