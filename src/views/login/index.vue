<template>
  <div class="login-container">
    <el-row type="flex" justify="center" style="width:100%">
      <el-card style="width:400px;margin:50px;background:rgba(255, 255, 255, 0.95);border:0">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
          <div style="color:#000;margin-bottom:20px">
            <h3>绩效管理平台</h3>
          </div>
          <el-form-item prop="company">
            <el-row type="flex">
              <span class="svg-container">
                <svg-icon icon-class="international" />
              </span>
              <el-select v-model="loginForm.company" placeholder="公司" style="width:100%">
                <el-option v-for="item in companyOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-row>
          </el-form-item>
          <el-form-item prop="department">
            <el-row type="flex">
              <span class="svg-container">
                <svg-icon icon-class="tree-table" />
              </span>
              <el-select v-model="loginForm.department" placeholder="部门" style="width:100%">
                <el-option v-for="item in departmentOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-row>
          </el-form-item>
          <el-form-item prop="username">
            <el-row type="flex">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text"
                tabindex="1" auto-complete="on" />
            </el-row>
          </el-form-item>

          <el-form-item prop="password">
            <el-row type="flex">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                placeholder="密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-row>
          </el-form-item>
          <el-row type="flex">
            <el-button :loading="loading" type="primary" style="width:50%;" class="cu-shadow"
              @click.native.prevent="handleLogin">登录</el-button>
            <el-button :loading="loading" type="info" style="width:50%;" class="cu-shadow"
              @click.native.prevent="handleLogin">访客登录</el-button>
          </el-row>
          <el-row type="flex" justify="start" style="margin-top:10px">
            <small><a href="#" class="link-type">忘记密码？</a></small>
          </el-row>
        </el-form>
      </el-card>
    </el-row>

    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form> -->
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        company: "无名市烟草专卖局（公司）",
        department: "业务科",
        username: "admin",
        password: "111111"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      companyOptions: [
        "无名市烟草专卖局（公司）"
      ],
      departmentOptions: ["办公室", "专卖科", "业务科", "财务科"],
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #000;
$cursor: #eee;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.link-type,
.link-type:focus {
  color: #337ab7;
  cursor: pointer;

  &:hover {
    color: rgb(32, 160, 255);
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("../../assets/loginBg.png");
  background-size: auto 100%;
  display: flex;
  align-items: center;

  .login-form {
    position: relative;
    left: 50%;
    top: 50%;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
