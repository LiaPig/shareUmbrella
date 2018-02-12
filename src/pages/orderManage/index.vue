<template>
    <div>
      <!--标题／操作按钮行-->
      <el-row class="top_row">
        <el-row class="title1">:) 订单管理</el-row>
        <el-row class="search">
          <!--订单录入按钮-->
          <el-col :span="3" style="float: right;text-align: right;">
            <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">订单录入</el-button>
          </el-col>
        </el-row>
      </el-row>
      <!--弹出框-->
      <el-dialog :title="formTitle" :visible.sync="showDialog">
        <el-form :model="form" ref="form" label-width="100px" :rules="formRules">
          <!--租借点代号/租借点名称-->
          <el-row>
            <!--租借点代号-->
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="10" style="height: 40px;">
              <el-form-item label="租借点代号:" prop="rentPoint">
                <el-input v-model="form.rentPoint" placeholder="请输入租借点代号"></el-input>
              </el-form-item>
            </el-col>
            <!--租借点名称-->
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="10" style="height: 40px;">
              <el-form-item label="租借点名称:" prop="rentName">
                <el-input v-model="form.rentName" placeholder="请输入租借点名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--归还点代号/归还点名称-->
          <el-row style="margin-top: 10px">
            <!--归还点代号-->
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="10" style="height: 40px;">
              <el-form-item label="归还点代号:">
                <el-input v-model="form.returnPoint" placeholder="请输入归还点代号"></el-input>
              </el-form-item>
            </el-col>
            <!--归还点名称-->
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="10" style="height: 40px;">
              <el-form-item label="归还点名称:">
                <el-input v-model="form.returnName" placeholder="请输入归还点名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--租借人id/订单状态-->
          <el-row style="margin-top: 10px">
            <!--租借人id-->
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="10" style="height: 40px;">
              <el-form-item label="租借人id:" prop="userId">
                <el-input v-model="form.userId" placeholder="请输入租借人id"></el-input>
              </el-form-item>
            </el-col>
            <!--订单状态-->
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="10" style="height: 40px;">
              <el-form-item label="订单状态:" prop="status">
                <el-select v-model="form.status" placeholder="请选择" style="width: 100%">
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
          <!--开始时间-->
          <el-row style="margin-top: 10px">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="13" style="height: 40px;">
              <el-form-item label="开始时间:">
                <el-date-picker
                  v-model="startTime"
                  type="datetime"
                  placeholder="选择开始时间"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--结束时间-->
          <el-row style="margin-top: 10px">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="13" style="height: 40px;">
              <el-form-item label="结束时间:">
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择结束时间"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="warning" @click="formSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            // 是否显示菜单录入弹窗
            showDialog: false,
            // 弹窗类型(1:录入，2:编辑)
            formType: 1,
            // 弹窗标题
            formTitle: "订单录入",
            // 录入弹窗里的表单
            form: {
              title: "",
              icon: "",
              path: "",
              key: null,
            },
            // 用来显示的开始时间
            startTime: "",
            // 用来显示的结束时间
            endTime: "",
            // 弹窗里的表单认证
            formRules: {
              title: [
                {required: true, message: '请输入菜单名称', trigger: 'blur'},
                {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
              ],
              path: [
                {required: true, message: '请输入菜单地址', trigger: 'blur'}
              ],
              key: [
                {
                  pattern: /^\d{1,2}$/, message: '请输入 2 到 99 的数字'
                }
              ]
            },
            // 订单状态选项
            statusOptions: [
              {
                value: "0",
                label: "禁用"
              },
              {
                value: "1",
                label: "进行中"
              },
              {
                value: "2",
                label: "已完成"
              },
            ],

          }
      },
      methods: {
        // 点击菜单录入按钮
        handleAdd() {
          this.formType = 1;
          this.formTitle = "订单录入";
          this.form = {
            rentPoint: "",
            rentName: "",
            returnPoint: "",
            returnName: "",
            userId: "",
            status: "",
          };
          this.startTime = "";
          this.endTime = "";
          // 打开弹窗
          this.showDialog = true;
        },
        // 点击弹窗里的确认按钮(formType,2为编辑)
        formSubmit() {
          this.$refs["form"].validate((valid) => {
            if (valid) {
              // 1.录入(新增)
              if (this.formType === 1) {
                console.log(this.baseJs.formatDate.format(this.startTime, 'yyyy-MM-dd hh:mm:ss'));
                console.log(this.endTime)
                this.$message.success("录入成功！");
              }
              // 2.编辑(修改)
              else if (this.formType === 2) {
                this.$message.success("修改成功！");
              }
              // 关闭弹窗
              this.showDialog = false;
            } else {
              return false;
            }
          });

        },
      },
      mounted() {

      }
    }
</script>

<style scoped>

</style>
