<template>
  <div>
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 菜单管理</el-row>
      <el-row class="search">
        <!--菜单录入按钮-->
        <el-col :span="3" style="float: right;text-align: right;">
          <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">菜单录入</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!--菜单管理表格-->
    <el-row class="lia_table">
      <template style="">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            sortable
            prop="key"
            label="顺序"
            width="120">
          </el-table-column>
          <el-table-column
            sortable
            prop="title"
            label="菜单名称"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            prop="path"
            label="菜单路径"
            width="250">
          </el-table-column>
          <el-table-column
            sortable
            prop="icon"
            label="菜单图标">
          </el-table-column>
          <el-table-column
            sortable
            label="状态"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '1'">正常</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
              <el-button @click="handleEdit(scope.row)" type="primary" plain size="small" style="margin-left: 1px">编辑
              </el-button>
              <el-button @click="handleDetail(scope.row)" type="warning" plain size="small" style="margin-left: 1px">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>
    <!--弹出框-->
    <el-dialog :title="formTitle" :visible.sync="showDialog">
      <el-form :model="form" ref="form" label-width="100px" :rules="formRules">
        <!--菜单名称-->
        <el-row>
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="菜单名称:" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="warning">
            菜单名称范围2~16位字符,且不为空
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
        </el-row>
        <!--菜单地址-->
        <el-row style="margin-top: 20px;">
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="菜单地址:" prop="path">
              <el-input v-model="form.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="warning">
            建议应该以／开头,比如"/home",且不为空
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
        </el-row>
        <!--图标-->
        <el-row style="margin-top: 20px;">
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="菜单图标:" prop="icon">
              <el-input v-model="form.icon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--顺序-->
        <el-row style="margin-top: 20px;">
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="菜单顺序:" prop="key">
              <el-input v-model="form.key"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="warning" @click="formSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--菜单详情弹窗-->
    <el-dialog title="查看菜单详情" :visible.sync="showDetail">
      <el-row class="dialogDetail">
        <!--菜单名称／菜单顺序-->
        <el-row style="padding-top: 30px">
          <!--菜单名称-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 菜单名称：</el-col>
            <el-col :span="12" class="content">{{detail.title}}</el-col>
          </el-col>
          <!--菜单顺序-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 菜单顺序：</el-col>
            <el-col :span="12" class="content">{{detail.key}}</el-col>
          </el-col>
        </el-row>
        <!--菜单地址／菜单状态-->
        <el-row style="padding-top: 10px">
          <!--菜单地址-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 菜单地址：</el-col>
            <el-col :span="12" class="content">{{detail.path}}</el-col>
          </el-col>
          <!--菜单状态-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 菜单状态：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.status === '1'">正常</span>
              <span v-else>禁用</span>
            </el-col>
          </el-col>
        </el-row>
        <!--菜单图标-->
        <el-row style="padding-top: 10px;margin-bottom: 30px">
          <!--菜单图标-->
          <el-col :span="22">
            <el-col :span="6" class="title">◆ 菜单图标：</el-col>
            <el-col :span="16" class="content">
              {{detail.icon}}
              <span :class="detail.icon" style="margin-left: 10px;font-size: 18px;color: #E6A23C;"></span>
            </el-col>
          </el-col>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="showDetail = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {addMenu, getMenus} from 'Api/menu'

  export default {
    data() {
      return {
        // 是否显示菜单录入弹窗
        showDialog: false,
        // 弹窗类型(1:录入，2:编辑)
        formType: 1,
        // 弹窗标题
        formTitle: "菜单录入",
        // 录入弹窗里的表单
        form: {
          title: "",
          icon: "",
          path: "",
          key: null,
        },
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

        // 表格数据
        tableData: [
          {
            id: "123456",
            key: 1,
            path: '/home',
            icon: 'iconfont icon-shouye',
            title: '首页',
            status: "1",
          },
          {
            id: "123456",
            key: 2,
            path: '/user',
            icon: 'iconfont icon-pengyou',
            title: '用户管理',
            status: "1",
          },
          {
            id: "123456",
            key: 3,
            path: '/menu',
            icon: 'iconfont icon-leimu',
            title: '菜单管理',
            status: "1",
          },
          {
            id: "123456",
            key: 4,
            path: '/umbrella',
            icon: 'iconfont icon-yusan1',
            title: '雨伞管理',
            status: "1",
          },
          {
            id: "123456",
            key: 5,
            path: '/location',
            icon: 'iconfont icon-dianpu',
            title: '租借点管理',
            status: "1",
          },
        ],
        // 是否显示详情弹窗
        showDetail: false,
        // 详情弹窗的数据
        detail: {},
      };
    },
    methods: {
      // 获取表格数据
      getTableData() {
        this.$http.get(getMenus)
          .then(res => {
            if (res.data.code === 20000) {
              this.tableData = res.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        ;
      },
      // 点击菜单录入按钮
      handleAdd() {
        this.formType = 1;
        this.formTitle = "菜单录入";
        this.form = {
          title: "",
          icon: "",
          path: "",
          key: 99,
          status: "1",
        };
        // 打开弹窗
        this.showDialog = true;
      },
      // 点击某一行里的编辑按钮
      handleEdit(data) {
        this.formType = 2;
        this.formTitle = "编辑菜单";
        this.form = data;
        // 打开弹窗
        this.showDialog = true;
      },
      // 点击弹窗里的确认按钮(formType,2为编辑)
      formSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            // 1.录入(新增)
            if (this.formType === 1) {
              let params = this.form;
              this.$http.post(addMenu, params).then(res => {
                if (res.data.code === 20000) {
                  this.$message.success("录入成功！");
                }
              })
                .catch(function (error) {
                  console.log(error);
                });

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
      // 点击某一行里的删除按钮
      handleDelete(data) {
        const that = this;
        that.$confirm('此操作将删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 点击某一行里的查看详情
      handleDetail(data) {
        this.detail = data;
        // 打开弹窗
        this.showDetail = true;
        console.log(data)
      }
    },
    mounted() {
      this.getTableData();
    }
  }
</script>

<style>
  .warning {
    margin-left: 10px;
    padding-top: 5px;
    font-size: 8px;
    line-height: 30px;
    color: #aaa;
    text-align: left;
  }
</style>
