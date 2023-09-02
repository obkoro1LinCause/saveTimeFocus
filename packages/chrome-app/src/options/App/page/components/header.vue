<template>
  <div class="header-box">
    <div class="header-lt">
        save-time-focus
        {{tm('name')}}
    </div>
    <div class="header-rt">
        <el-dropdown 
            ref="dropdown" 
            @command="onDropdown"
            v-model="lang"
            class="mr-5"
        >
            <Icon type="textMid" class="cursor"></Icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="en">
                        <div class="item">
                            <span :class="`${lang === 'en' ? 'theme-color mr-2':'mr-2'}`">Enlish</span>
                            <span v-if="lang === 'en'">😊</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="zh">
                        <div class="item">
                            <span :class="`${lang === 'zh' ? 'theme-color mr-2':'mr-2'}`">Chinese</span>
                            <span  v-if="lang === 'zh'">😊</span>
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-switch v-model="themeVal" :active-action-icon="Moon" :inactive-action-icon="Sunny" @change="onChange"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance,computed,defineEmits } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue';
import Icon from './icon.vue';
import { VueI18n } from '@bs/component';
const { useI18n } = VueI18n;
const { tm ,locale} = useI18n();

const emits = defineEmits(['changeLang']);

const themeVal = ref(false);
const dropdown = ref();
const lang = ref('zh');


const onChange = (val:string)=>{
    let type = '',
    theme = '';
    if(val){ 
        type = 'twistTheme';
        theme = 'dark-mode';
    }else{
        type = 'focusTheme';
        theme = 'white-mode';
    }
    const app = document.getElementById('app');
    app?.setAttribute('class',`${type}`);
    document.documentElement.setAttribute('theme', theme);
};

const onDropdown = (command:string)=>{
    locale.value = command;
    lang.value = command;
    localStorage.setItem('lang', command);
    emits('changeLang',command);
}



</script>

<style scoped>
.header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    padding: 0 10px;
}
.header-rt{
    display: flex;
    align-items: center;
}
.popover{
    margin: 10px;
}

</style>
