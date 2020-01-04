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
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="43px"
        class="demo-ruleForm login-form"
      >
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <!-- 验证码 -->
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <!-- 验证码 -->
              <!-- <img src="../../assets/code.jpg" alt="" /> -->
              <img @click="changeCode" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
import axios from "axios";
const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("手机号不能为空"));
  } else {
    // 定义正则表达式
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    // 验证
    if (reg.test(value) == true) {
      callback();
    } else {
      // 错
      callback(new Error("手机号可能写错了呢"));
    }
  }
};
export default {
  name: "login",
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        phone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度4个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.ruleForm.checked == false) {
        this.$message.warning("请先勾选用户协议");
        return;
      }
      // 等同于 this.$refs.ruleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$message.success("验证成功");
          // 调用接口
          axios({
            url: process.env.VUE_APP_BASEURL + "/login",
            method: "post",
            // 跨域 是否携带 cookie
            withCredentials: true,
            data: {
              phone: this.ruleForm.phone,
              password: this.ruleForm.password,
              code: this.ruleForm.code
            }
          }).then(res => {
            window.console.log('00000000');
            if (res.data.code === 202) {
              // 错误
              this.$message.error(res.data.message);
            } else if (res.data.code === 200) {
              this.$message.success("老铁，你可算回来啦！！！");
            }
          });
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCode() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    }
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
  // 登录表单
  .login-form {
    padding-right: 41px;
    margin-top: 27px;
    // 栅格 验证码
    .code-col {
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        // 小手手
        cursor: pointer;
      }
    }
    // 更高的文本框
    .high-input > input {
      height: 45px;
      line-height: 45px;
    }
  }
  // 表单内部的 按钮
  .login-btn {
    width: 100%;
    margin-left: 0;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
  .reset-btn {
    margin-top: 28px;
  }
}
.bg {
}
</style>