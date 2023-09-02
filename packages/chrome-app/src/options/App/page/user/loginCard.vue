<template>
    <div class="login-box">
        <el-form
            label-position="right"
            label-width="100px"
            :model="formData"
            style="max-width: 460px"
        >
            <el-form-item label="邮箱">
                <el-input v-model="formData.email"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password"/>
            </el-form-item>
            <el-button type="primary" @click="onClick">登录</el-button>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { userLogin } from '@/service/domain/user';
import { ref,computed } from 'vue';

const formData=ref({
    email:'',
    password:'',
});

const onClick = async ()=>{
    try{
        const ret =  await userLogin({
            email:formData.value.email,
            password:formData.value.password
        });
        console.log(ret,'---ret---')
    }catch(err){
         console.log(err,'---err---');
    }
  
   
};


</script>


<style scoped>

</style>
