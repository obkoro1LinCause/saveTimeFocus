<template>
  <div class="user-login-sign flex">
    <a-tabs v-model="activeKey" @tabClick="tabClick" centered>
      <a-tab-pane key="1" :tab="tm('user.emailLogin')">
        <a-form
          class="form-container"
          :model="loginState"
          name="basic"
          :rules="rulesBylogin"
          :label-col="{
            span: 5,
          }"
          ref="LoginRef"
        >
          <a-form-item :label="tm('user.email')" name="email">
            <a-input
              v-model:value="loginState.email"
              :placeholder="tm('user.emailTk')"
              allowClear
            />
          </a-form-item>
          <a-form-item :label="tm('user.password')" name="password">
            <a-input-password
              v-model:value="loginState.password"
              :placeholder="tm('user.passwordTk')"
              allowClear
            />
          </a-form-item>
        </a-form>
        <div class="footer">
          <a-button @click="onClick('forget')" type="link">{{
            tm("user.forgetPd")
          }}</a-button>
          <a-button class="login-btn" type="primary" @click="onClick('login')">{{ tm("login") }}</a-button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="tm('user.signUser')">
        <a-form
          class="form-container"
          :rules="rulesByregister"
          :model="registerState"
          name="basic"
          :label-col="{
            span: 5,
          }"
          ref="RegisterRef"
        >
          <a-form-item :label="tm('user.email')" name="email">
            <a-input
              v-model:value="registerState.email"
              :placeholder="tm('user.emailTk')"
              allowClear
            />
          </a-form-item>
          <a-form-item :label="tm('user.password')" name="password">
            <a-input-password
              v-model:value="registerState.password"
              :placeholder="tm('user.passwordTk')"
              allowClear
            />
          </a-form-item>
          <a-form-item :label="tm('user.passwordVerify')" name="passwordVerify">
            <a-input-password
              v-model:value="registerState.passwordVerify"
              :placeholder="tm('user.passwordVerifyTk')"
              allowClear
            />
          </a-form-item>
          <a-form-item :label="tm('user.emailCode')" name="emailCode">
            <div class="flex" style="align-items: center">
              <a-input
                v-model:value="registerState.emailCode"
                :placeholder="tm('user.emailCodeTk')"
                allowClear
              />
              <a-button class="ml-2" size="small" @click="onClick('send')">{{
                tm("user.sendEmailCode")
              }}</a-button>
            </div>
          </a-form-item>
          <a-form-item :label="tm('user.inviteCode')" name="inviteCode">
            <a-input
              v-model:value="registerState.inviteCode"
              :placeholder="tm('user.inviteCodeTk')"
              allowClear
              @change="(e) => onChange(e, 'inviteCode')"
            />
          </a-form-item>
          <span class="tip">{{ tm("user.tip") }}</span>
        </a-form>
        <div class="footer">
          <a-button @click="onClick('register')" type="primary">{{ tm("sign")}}</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, reactive } from "vue";
import { useRouter } from "vue-router";
import { isEmail } from "./index";
import { message } from "ant-design-vue";
import { userRegister, userSendEmail, userLogin } from "@/service/domain/user";
import { useUserStore } from "../../stores/user";
import { useI18n } from "@/locales";

const { tm, locale } = useI18n();
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
  passwordVerify: "",
  emailCode: "",
  inviteCode: "",
});

const checkEmail = (_rule, value) => {
  if (!value) return Promise.reject(tm('user.emailErr.error1'));
  if (!isEmail(value)) return Promise.reject(tm("user.emailErr.error2"));
  return Promise.resolve();
};
const checkPassword = (_rule, value) => {
  if (!value) return Promise.reject(tm("user.passwordErr.error1"));
  if (value?.length < 6) return Promise.reject(tm("user.passwordErr.error2"));
  return Promise.resolve();
};
const checkPasswordVerify = (_rule, value) => {
  if (!value) return Promise.reject(tm("user.passwordVerifyErr.error1"));
  if (value !== registerState.password)
    return Promise.reject(tm("user.passwordVerifyErr.error2"));
  return Promise.resolve();
};
const checkEmailCode = (_rule, value) => {
  if (!value) return Promise.reject(tm("user.emailCodeErr.error1"));
  if (value?.length < 6) return Promise.reject(tm("user.emailCodeErr.error2"));
  return Promise.resolve();
};
const checkInviteCode = (_rule, value) => {
  if (value) {
    if (value?.length !== 8)
      return Promise.reject(tm("user.inviteCodeErr.error1"));
  }
  return Promise.resolve();
};

const rulesBylogin = {
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
};

const rulesByregister = {
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  passwordVerify: [
    { required: true, validator: checkPasswordVerify, trigger: "blur" },
  ],
  emailCode:[{ required: true,validator:checkEmailCode, trigger: 'blur'}],
  inviteCode: [{ validator: checkInviteCode, trigger: "blur" }],
};

const tabClick = (tab: string) => {
  activeKey.value = tab;
};

const onClick = async (type: string) => {
  if (type === "forget") {
    router.push({
      name: "ForgetPage",
      params: {
        lang: locale.value,
      },
    });
  } else if (type === "login") {
    LoginRef.value
      .validate()
      .then(async (res) => {
        try {
          const params = Object.create(null);
          params.email = loginState.email;
          params.password = loginState.password;
          const ret = await userLogin(params);
          if (!ret.error) {
            // token暴露出来会危险
            localStorage.setItem("user-token", ret?.data?.token);
            router.push({
              name: "LifePage",
              params: {
                lang: locale.value,
              },
            });
          }
        } catch (err) {
          message.error(err?.data);
          return err;
        }
      })
      .catch((err) => err);
  } else if (type === "register") {
    RegisterRef.value
      .validate()
      .then(async (res) => {
        try {
          if (registerState.password !== registerState.passwordVerify) {
            return message.error(tm("user.passwordVerifyErr.error2"));
          }
          const params = Object.create(null);
          params.email = registerState.email;
          params.password = registerState.password;
          params.emailCode = registerState.emailCode;
          params.inviteCode = registerState.inviteCode;
          const ret = await userRegister(params);
          if (!ret.error) {
            message.success(tm("signSuccess"));
          }
        } catch (err) {
          message.error(err?.data);
          return err;
        }
      })
      .catch((err) => err);
  } else if (type === "send") {
    // 调用接口都需要写try catch太麻烦了 需要统一处理
    try {
      if (!registerState.email)
        return message.error(tm("user.emailErr.error1"));
      const ret = await userSendEmail({
        email: registerState.email,
      });
      if (!ret.error) {
        message.success(tm("user.emailCodeTip"));
      }
    } catch (err) {
      message.error(err?.data);
      return err;
    }
  }
};

const onChange = (e) => {
  console.log(e, "====onChange===");
};
</script>

<style scoped lang="scss">
.user-login-sign {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  height: 100%;
}
.form-container {
  width: 500px;
  margin: 0 auto;
}
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.tip {
  display: flex;
  color: #868a9a;
  font-size: 12px;
  justify-content: center;
}
</style>
<style lang="scss">
.user-login-sign .ant-tabs > .ant-tabs-nav:before {
  border-bottom: none;
}
</style>
