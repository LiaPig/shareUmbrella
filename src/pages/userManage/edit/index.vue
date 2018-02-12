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
          <!--微信名称／所在城市-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="微信名称：" prop="nickName">
                <el-input v-model="editForm.nickName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="所在城市：" prop="city">
                <el-input v-model="editForm.city" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--头像地址/头像预览-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="头像地址：" prop="avatarUrl">
                <el-input
                  :disabled="true"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入居住地址"
                  v-model="editForm.avatarUrl">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="头像预览：" prop="avatarUrl">
                <img :src="editForm.avatarUrl" style="width: 95px;height: 95px;border: 1px solid #C0C4CC;float: left;"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!--用户的id／性别-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="用户的id：" prop="id">
                <el-input v-model="editForm.id" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="性别：" prop="gender">
                <el-select v-model="editForm.gender" :disabled="true" style="width: 100%">
                  <el-option
                    v-for="item in genderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--租借次数/押金-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="租借次数：" prop="usageCount">
                <el-input v-model="editForm.usageCount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="押金：" prop="deposit">
                <el-input v-model="editForm.deposit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--余额／状态-->
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="余额：" prop="balance">
                <el-input v-model="editForm.balance"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9">
              <el-form-item label="状态：" prop="status">
                <el-select v-model="editForm.status" style="width: 100%">
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
  import {updateUser} from 'Api/user'
  export default {
    data() {
      // 自定义的确认两次密码是否相同函数
      return {
        // 表单
        editForm: {},
        // 表单里的性别选项
        genderOptions: [
          {
            value: 1,
            label: '男'
          },
          {
            value: 2,
            label: '女'
          }
        ],
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
          id: [
            {required: true, message: '', trigger: 'blur'},
          ],
          openId: [
            {required: true, message: '', trigger: 'blur'},
          ],
          nickName: [
            {required: true, message: '', trigger: 'blur'},
          ],
          avatarUrl: [
            {required: true, message: '', trigger: 'blur'},
          ],
          city: [
            {required: true, message: '', trigger: 'blur'},
          ],
          gender: [
            {required: true, message: '', trigger: 'change'},
          ],
          deposit: [
            {required: true, message: '押金不能为空', trigger: 'blur'},
          ],
          usageCount: [
            {required: true, message: '租借次数不能为空', trigger: 'blur'},
          ],
          balance: [
            {required: true, message: '余额不能为空', trigger: 'blur'},
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
        that.$refs.editForm.validate((valid) => {
          if (valid) {
            let params = {
              id: that.editForm.id,
              deposit: Number(that.editForm.deposit),
              balance: Number(that.editForm.balance),
              usageCount: Number(that.editForm.usageCount),
              status: that.editForm.status,
            };
            that.$http.post(updateUser,params)
              .then(res => {
                // console.log(res)
                this.$message.success("修改成功！");
                that.handleCancel();
              })
              .catch(err => {
                console.error(err)
              });

            console.log(params)
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
