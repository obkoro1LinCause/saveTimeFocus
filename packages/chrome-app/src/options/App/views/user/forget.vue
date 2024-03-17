<template>
  <div class="user-forget">
     <span class="label">忘记密码</span>
     <a-form
        ref="FormRef"
        class="form-container"
        :rules="rulesByregister"
        :model="registerState"
        name="basic"
        :label-col="{
            span: 8
        }"
    >
        <a-form-item
        label="邮箱"
        name="email"
        >
        <a-input v-model:value="registerState.email" placeholder="请输入邮箱" allowClear/>
        </a-form-item>
        <a-form-item
        label="密码"
        name="password"
        >
        <a-input-password v-model:value="registerState.password" placeholder="请输入密码" allowClear/>
        </a-form-item>
        <a-form-item 
        label="再次输入密码" 
        name="passwordVerify"
        >
            <a-input-password v-model:value="registerState.passwordVerify" placeholder="请输入密码" allowClear/>
        </a-form-item>
        <a-form-item  label="邮箱验证码" name="emailCode">
            <div class="flex" style="align-items:center">
              <a-input v-model:value="registerState.emailCode" placeholder="请输入邮箱验证码" allowClear/>
              <a-button class="ml-2" size="small" @click="onClick('send')">发送验证码</a-button>
            </div>
        </a-form-item>
    </a-form>
    <div class="footer">
        <a-button @click="onClick('ok')" type="primary">确认修改</a-button>
        <a-button @click="onClick('login')" type="link">邮箱登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps,reactive } from "vue";
import { useRouter } from 'vue-router';
import { isEmail} from './index';
import { message } from 'ant-design-vue';
import { userSendEmail,userChangePassword } from '@/service/domain/user';
import { useI18n } from '@/locales';

 const { tm,locale } = useI18n();
const router = useRouter();
const registerState = reactive<any>({
  email: "",
  password: "",
  passwordVerify:"",
  emailCode:"",
  inviteCode:""
});
const FormRef = ref();

const checkEmail = (_rule,value)=>{
  if(!value) return Promise.reject('请输入邮箱');
  if(!isEmail(value)) return Promise.reject('邮箱格式输入错误'); 
  return Promise.resolve();
}
const checkPassword = (_rule,value)=>{
   if(!value) return Promise.reject('请输入密码');
   if(value?.length < 6) return Promise.reject('密码长度至少为6');
   return Promise.resolve();
}
const checkPasswordVerify = (_rule,value)=>{
   if(!value) return Promise.reject('请再次输入密码');
   if(value!==registerState.password) return Promise.reject('两次密码输入不一致');
   return Promise.resolve();
}
const checkEmailCode = (_rule,value)=>{
   if(!value) return Promise.reject('请输入邮箱验证码');
   if(value?.length < 6) return Promise.reject('验证码长度为6位');
   return Promise.resolve();
}


const rulesBylogin= {
  email:[{ required: true,validator:checkEmail,trigger: 'blur'},],
  password:[{ required: true, validator:checkPassword,trigger: 'blur'}],
};

const rulesByregister= {
  email:[{ required: true,validator:checkEmail,trigger: 'blur'},],
  password:[{ required: true,validator:checkPassword,trigger: 'blur'}],
  passwordVerify:[{ required: true, validator:checkPasswordVerify,trigger: 'blur'}],
  emailCode:[{ required: true,validator:checkEmailCode, trigger: 'blur'}]
};

const onClick = async (type: string) => {
  if(type === 'login'){
    router.push({
      name:'LoginOrSignPage',
      params:{
        lang:locale.value
      }
    });
  }else if(type === 'ok'){
    FormRef.value.validate().then(async res=>{
      if( registerState.password!==registerState.passwordVerify){
        return message.error('请确认好密码！')
      }
      const params = Object.create(null);
      params.email = registerState.email;
      params.password = registerState.password;
      params.emailCode = registerState.emailCode;
      const ret:any = await userChangePassword(params);
      if(!ret.error){
        const { data } = ret;
        localStorage.setItem('user-token',data?.token);
        location.reload();
      }
    }).catch(err=>err);
  }else if(type === 'send'){
    if(!registerState.email) return message.error('请输入邮箱账号');
    const ret = await userSendEmail({
      email:registerState.email
    });
    if(!ret.error){
      message.success('验证码已发送至邮箱，有效期为30分钟');
    };
  }
};


</script>

<style scoped lang="scss">
.user-forget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin:0 auto;
  height: 100%;
  width: 50%;

}
.label{
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 20px;
}
.form-container{
  margin:0 auto;
}
.tip{
  display: flex;
  color: #868A9A;
  font-size: 12px;
  justify-content: center;
}
.footer {
  display: flex;
  justify-content: center;
}
</style>
<style lang="scss">
.user .ant-tabs>.ant-tabs-nav:before{
  border-bottom:none ;
}
</style>
