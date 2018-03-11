<template>
  <div class="login_container">
    <el-row class="content">
      <el-row class="title">共享雨伞管理后台</el-row>
      <el-row class="form_content">
        <el-form :model="loginForm" ref="loginForm" :rules="rules">
          <el-row>
            <i class="iconfont icon-yonghu form_icon"></i>
            <el-form-item class="form_input" prop="userName">
              <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-row>
          <el-row style="margin-top: 60px">
            <i class="iconfont icon-yingckjian form_icon" style="font-size: 25px"></i>
            <el-form-item class="form_input" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-row style="margin-top: 100px;">
        <el-button @click="handleSubmit" type="warning" round style="display:inline-block;width: 60%">立即登录</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          userName: "admin",
          password: ""
        },
        // 表单验证
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs["loginForm"].validate((valid) => {
          if (valid) {
            if(this.loginForm.password === "admin") {
              this.$message({
                message: '恭喜你，登录成功!',
                type: 'success'
              });
              this.$store.commit('setIsLogin', true);
              window.localStorage.setItem('isLogin', true);
              // Cookies.set('Token', response.data.token)
              this.$router.push({path: '/home'});

            }
            else {
              this.$message({
                message: '登录失败：密码错误!',
                type: 'warning'
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped>
  .login_container {
    position: fixed;
    display: inline-block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #707880;
  }

  .content {
    position: absolute;
    top: 20%;
    left: 30%;
    height: 60%;
    width: 40%;
    background-color: #909aa3;
    border-radius: 35px;
  }

  .title {
    margin-top: 8%;
    text-align: center;
    color: #ffd04b;
    font-size: 30px;
  }

  .form_content {
    margin-top: 10%;
    width: 70%;
    left: 15%;
  }
  .form_col {
    display: inline-block;
    float: left;
    width: 100%;
  }
  .form_icon {
    position: absolute;
    top: 1px;
    left: 10%;
    display: inline-block;
    height: 35px;
    width: 35px;
    line-height: 35px;
    font-size: 30px;
    color: #ffd04b;
    border: 2px solid #ffd04b;
    border-radius: 5px;
  }
  .form_input {
    position: absolute;
    top: 0;
    left: calc(10% + 35px + 15px);
    display: inline-block;
    width: 70%;
  }

</style>
