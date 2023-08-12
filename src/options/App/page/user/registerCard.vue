<template>
    <div class="register-box">
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
                <el-input v-model="formData.region" />
            </el-form-item>
            <el-form-item label="邀请码">
                <el-input v-model="formData.invite_code" />
            </el-form-item>
            <el-form-item label="邮箱验证码">
                <el-input v-model="formData.emial_code" />
            </el-form-item>
            <el-button type="primary" @click="onClick">注册</el-button>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref,computed } from 'vue';

const formData=ref({
    email:'',
    password:'',
    invite_code:'',
    emial_code:''
});

const onClick = ()=>{
    console.log('注册');
};


</script>


<style scoped>

</style>
