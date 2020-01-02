<template>
  <div class="login-container">
    <!-- 左侧的盒子 -->
    <div class="left">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img src="../../assets/Logo.png" alt />
        <div class="title">雨里疯疯</div>
        <div class="line"></div>
        <div class="subtitle">用户登录</div>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" class="form">
        <el-form-item prop="phone">
          <el-input v-model="logForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="logForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" v-model="logForm.code" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="captcha" @click="randomLoginCaptcha" src="actions" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="add">登录</el-button>
          <el-button type="primary" class="cancel">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      }
    };
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  /*恻轴方向居中  */
  align-items: center;
  /* 线性渐变 */
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  /* 主轴方向 均分 */
  justify-content: space-around;
  height: 100%;
}
.left {
  width: 478px;
  height: 550px;
  background-color: #f5f5f5;
  padding-top: 44px;
  box-sizing: border-box;
  .title-box {
    display: flex;
    align-items: center;
    margin-left: 48px;
    margin-bottom: 27px;
    img {
      width: 22px;
      height: 17px;
      margin-right: 16px;
    }
    .title {
      font-size: 24px;
      font-weight: 400;
      color: #0c0c0c;
      margin-right: 14px;
    }
    .line {
      width: 1px;
      height: 28px;
      background-color: #c7c7c7;
      margin-right: 12px;
    }
    .subtitle {
      font-size: 22px;
      font-weight: 400;
      color: #0c0c0c;
    }
  }
  .form {
    padding: 0 41px 0 43px;
    .add {
      width: 100%;
      margin-bottom: 26px;
    }
    .el-button + .el-button,
    .cancel {
      margin-left: 0;
      width: 100%;
    }
  }
}
.login-container .bg {
}
</style>