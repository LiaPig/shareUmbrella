<template>
  <div>
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 编辑用户信息</el-row>
      <el-row class="button_row">
        <!--提交按钮-->
        <span style="float: right;padding-right: 30px;">
          <el-button type="warning" @click="submitForm" style="width: 92px;height: 38px;">提交</el-button>
        </span>
        <!--取消按钮-->
        <span style="float: right;padding-right: 20px;">
          <el-button @click="handleCancel"
                     style="width: 92px;height: 38px;background-color: #909399;color: #ffffff">取消</el-button>
        </span>
      </el-row>
    </el-row>
    <!--编辑用户表单-->
    <el-row class="form">
      <el-col :span="24">
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <!--用户名／真实姓名-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="用户名：" prop="userName">
                <el-input v-model="editForm.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="真实姓名：" prop="realName">
                <el-input v-model="editForm.realName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机号码／邮箱-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="editForm.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="editForm.email" placeholder="请输入邮箱"></el-input>
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
                  v-model="editForm.address">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="状态：" prop="status">
                <el-select v-model="editForm.status" placeholder="请选择" style="width: 100%">
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
          <!--密码-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="密码：" prop="password">
                <el-input v-model="editForm.showPass" placeholder="请输入密码" type="password" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click="editPassword" style="margin-left: 10px" icon="el-icon-edit" type="warning" plain>修改密码</el-button>
            </el-col>
          </el-row>
          <!--密码弹出框-->
          <el-dialog title="修改密码" :visible.sync="showNewPassword">
            <el-row>
              <el-form :model="editPass" ref="editPass" :rules="passwordRules">
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="18">
                  <el-form-item label="新密码：" label-width="80px" prop="password">
                    <el-input v-model="editPass.password"></el-input>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showNewPassword = false" plain>取 消</el-button>
              <el-button type="warning" @click="handleEditPass">修 改</el-button>
            </div>
          </el-dialog>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      // 自定义的确认两次密码是否相同函数
      return {
        // 表单
        editForm: {
          userName: "",
          realName: "",
          phone: "",
          email: "",
          address: "",
          status: "1",
          // 用来显示的密码
//          showPass: ""
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

        // 修改密码
        editPass: {
          password: "",
        },
        // 是否显示修改密码弹窗
        showNewPassword: false,
        // 修改密码里的表单验证
        passwordRules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ],
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
        that.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$message.success("点击提交了哦");
          } else {
            this.$message.warning("提交失败，请检查填写是否符合条件");
            return false;
          }
        });
      },
      // 根据id获取用户信息
      getFormData(data) {
        this.editForm = data;
      },
      // 点击修改密码打开修改密码弹窗
      editPassword() {
        // 1.打开弹窗
        this.showNewPassword = true;
      },
      // 点击修改密码弹窗里的修改按钮
      handleEditPass() {
        this.$refs.editPass.validate((valid) => {
          if (valid) {
            this.$message.success("修改密码成功！新密码为" + this.editPass.password);
            // 关闭弹窗
            this.showNewPassword = false;
          } else {
            this.$message.warning("提交失败，请检查填写是否符合条件");
            return false;
          }
        });
      }
    },
    mounted() {
      const data = this.$route.params.data;
      console.log(data)
      if (!data) {
        this.$router.push({name: 'loading',params: {path: '/user'}})
      } else {
        this.getFormData(data);
      }
    },
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
