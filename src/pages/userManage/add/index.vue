<template>
  <div>
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 用户录入</el-row>
      <el-row class="button_row">
        <!--提交按钮-->
        <span style="float: right;padding-right: 30px;">
          <el-button type="warning" @click="submitForm" style="width: 92px;height: 34px;">提交</el-button>
        </span>
        <!--取消按钮-->
        <span style="float: right;padding-right: 20px;">
          <el-button @click="handleCancel"
                     style="width: 92px;height: 34px;background-color: #909399;color: #ffffff">取消</el-button>
        </span>
      </el-row>
    </el-row>
    <!--新增用户表单-->
    <el-row class="form">
      <el-col :span="24">
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
          <!--用户名／真实姓名-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="用户名：" prop="userName">
                <el-input v-model="addForm.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="真实姓名：" prop="realName">
                <el-input v-model="addForm.realName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--密码／重复密码-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="密码：" prop="password">
                <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="重复密码：" prop="checkPass">
                <el-input v-model="addForm.checkPass" placeholder="请输入再次输入密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机号码／邮箱-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="addForm.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="addForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--地址/状态-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="地址：" prop="address">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入居住地址"
                  v-model="addForm.address">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="状态：" prop="status">
                <el-select v-model="addForm.status" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      // 自定义的确认两次密码是否相同函数
      const validatePass = (rule, value, callback) => {
        if (value !== this.addForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      };
      return {
        // 表单
        addForm: {
          userName: "",
          realName: "",
          password: "",
          checkPass: "",
          phone: "",
          email: "",
          address: "",
          status: "1"
        },
        // 表单里的状态选项
        statusOptions: [
          {
            value: '1',
            label: '正常'
          },
          {
            value: '0',
            label: '禁用'
          }
        ],
        // 表单验证
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
            {
              pattern: /[\u4e00-\u9fa5]/gm,
              message: '请输入中文'
            }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {
              pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '请输入正确的手机号码'
            }
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {
              pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
              message: '请输入正确的邮箱地址'
            }
          ],
          address: [
            {required: true, message: '请输入住址', trigger: 'blur'},
            {min: 5, message: '长度至少5个字符', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change'}
          ]
        },
      };
    },
    methods: {
      // 点击取消
      handleCancel() {
        this.$router.push({path: '/user'});
      },
      // 点击提交
      submitForm() {
        const that = this;
        that.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$message.success("点击提交了哦");
          } else {
            this.$message.warning("提交失败，请检查填写是否符合条件");
            return false;
          }
        });
      },
    }
  }
</script>

<style>
  .top_row {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background-color: #ffffff;
    border-bottom: 1px solid #DCDFE6;
    margin-bottom: 10px;
  }

  .title1 {
    float: left;
    margin-left: 20px;
    width: calc(100% - 40px);
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #000000;
    text-align: left;
    border-bottom: 1px solid #DCDFE6;
  }

  .button_row {
    float: left;
    margin-left: 20px;
    width: calc(100% - 40px);
    height: 60px;
    line-height: 60px;
    font-size: 14px;
  }

  .form {
    margin-top: 20px;
    width: 94%;
    padding: 30px 10px 10px 10px;
    margin-left: 3%;
    background-color: #ffffff;
    border: 1px solid #DCDFE6;
  }
</style>
