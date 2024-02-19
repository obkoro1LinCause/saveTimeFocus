<template>
  <div class="user-login-sign flex">
    <a-tabs v-model="activeKey" @tabClick="tabClick" centered style="height:400px;width:500px">
      <a-tab-pane key="1" tab="邮箱登录">
         <a-form
          class="form-container"
          :model="loginState"
          name="basic"
          :rules="rulesBylogin"
          :label-col="{
             span: 5
          }"
          ref="LoginRef"
        >
          <a-form-item
            label="邮箱"
            name="email"
          >
            <a-input v-model:value="loginState.email" placeholder="请输入邮箱" allowClear/>
          </a-form-item>
          <a-form-item
            label="密码"
            name="password"
          >
            <a-input-password v-model:value="loginState.password" placeholder="请输入密码" allowClear/>
          </a-form-item>
        </a-form>
        <div class="footer">
          <a-button @click="onClick('forget')" type="link">忘记密码</a-button>
          <a-button class="login-btn" type="primary"  @click="onClick('login')">登录</a-button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册账户">
        <a-form
          class="form-container"
          :rules="rulesByregister"
          :model="registerState"
          name="basic"
          :label-col="{
             span: 5
          }"
          ref="RegisterRef"
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
             <a-input-password v-model:value="registerState.passwordVerify" placeholder="请再次输入密码" allowClear/>
          </a-form-item>
          <a-form-item label="邮箱验证码" name="emailCode">
              <div class="flex" style="align-items: center;">
                <a-input v-model:value="registerState.emailCode" placeholder="请输入邮箱验证码" allowClear/>
                <a-button class="ml-2" size="small" @click="onClick('send')">发送验证码</a-button>
              </div>
          </a-form-item>
          <a-form-item label="邀请码" name="inviteCode">
            <a-input v-model:value="registerState.inviteCode" placeholder="请输入邀请码" allowClear @change="(e)=>onChange(e,'inviteCode')"/>
          </a-form-item>
          <span class="tip">提示：填写邀请码，您和您的朋友将获得两个月的免费会员，快找您的朋友拿邀请码吧</span>
        </a-form>
        <div class="footer">
          <a-button @click="onClick('register')" type="primary">注册</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps,reactive } from "vue";
import { useRouter } from 'vue-router';
import { isEmail } from './index';
import { message } from 'ant-design-vue';
import { userRegister,userSendEmail,userLogin } from '../../service/domain/user';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
const router = useRouter();
const LoginRef = ref();
const RegisterRef = ref();
const activeKey = ref("1");
const loginState = reactive<any>({
  email: "",
  password: "",
});
const registerState = reactive<any>({
  email: "",
  password: "",
  passwordVerify:"",
  emailCode:"",
  inviteCode:""
});

const checkEmail = (_rule,value)=>{
  if(!value) return Promise.reject('请输入邮箱账号');
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
const checkInviteCode = (_rule,value)=>{
  if(value){
    if(value?.length !==8) return Promise.reject('邀请码长度为8位');
  }
  return Promise.resolve();
}


const rulesBylogin= {
  email:[{ required: true, validator:checkEmail,trigger: 'blur'},],
  password:[{ required: true, validator:checkPassword,trigger: 'blur'}],
};

const rulesByregister= {
  email:[{ required: true,validator:checkEmail,trigger: 'blur'},],
  password:[{ required: true,validator:checkPassword,trigger: 'blur'}],
  passwordVerify:[{ required: true, validator:checkPasswordVerify,trigger: 'blur'}],
  emailCode:[{ required: true,validator:checkEmailCode, trigger: 'blur'}],
  inviteCode:[{validator:checkInviteCode, trigger: 'blur'}]
};



const tabClick = (tab: string) => {
  activeKey.value = tab;
};

const onClick = async (type: string) => {
  if(type === 'forget'){
    router.push('/app/user/forget');
  }else if(type === 'login'){
    LoginRef.value.validate().then(async res=>{
      const params = Object.create(null);
      params.email = loginState.email;
      params.password = loginState.password;
      const ret = await userLogin(params);
      if(!ret.error){
        message.success('登陆成功');
        userStore.setUserToken(ret?.data?.token);
        router.push('/app/home');
      };
    }).catch(err=>err);
  }else if(type === 'register'){
    RegisterRef.value.validate().then(async res=>{
      if( registerState.password!==registerState.passwordVerify){
        return message.error('请确认好密码！')
      }
      const params = Object.create(null);
      params.email = registerState.email;
      params.password = registerState.password;
      params.emailCode = registerState.emailCode;
      params.inviteCode = registerState.inviteCode;
      const ret = await userRegister(params);
      if(!ret.error){
        message.success('注册成功');
      };
    }).catch(err=>err);
  }else if(type === 'send'){
    if(!registerState.email) return message.error('请输入邮箱账号');
    console.log(type,'==type=');
    const ret = await userSendEmail({
      email:registerState.email
    });
    if(!ret.error){
      message.success('验证码已发送至邮箱，有效期为30分钟');
    };
  }
};

const onChange = (e)=>{
   console.log(e, "====onChange===");
}



</script>

<style scoped lang="scss">
.user-login-sign {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin:0 auto;
}
.form-container{
  width: 500px;
  margin:0 auto;
}
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.tip{
  display: flex;
  color: #868A9A;
  font-size: 12px;
  justify-content: center;
}
</style>
<style lang="scss">
.user-login-sign .ant-tabs>.ant-tabs-nav:before{
  border-bottom:none ;
}
</style>
