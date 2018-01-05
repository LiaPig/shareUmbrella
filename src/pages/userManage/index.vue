<template>
  <div class="user_container">
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 用户管理</el-row>
      <el-row class="search">
        <!--真实姓名-->
        <el-col class="title2">真实姓名：</el-col>
        <el-col class="input">
          <el-input
            placeholder="请输入真实姓名"
            prefix-icon="el-icon-search"
            v-model="searchData.realName">
          </el-input>
        </el-col>
        <!--用户名-->
        <el-col class="title2">用户名：</el-col>
        <el-col class="input">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-search"
            v-model="searchData.userName">
          </el-input>
        </el-col>
        <!--查询按钮-->
        <el-col style="width: 80px;margin-left: 20px">
          <el-button type="primary" style="height: 40px" size="small" icon="el-icon-search">查询</el-button>
        </el-col>
        <!--用户录入按钮-->
        <el-col :span="3" style="float: right;text-align: right">
          <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">用户录入</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!--用户管理表格-->
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
            prop="userName"
            label="用户名"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="realName"
            label="真实姓名"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="phone"
            label="联系方式"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="email"
            label="邮箱"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
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
    <!--用户详情弹窗-->
    <el-dialog title="查看用户详情" :visible.sync="showDetail">
      <el-row class="dialogDetail">
        <!--用户名／真实姓名-->
        <el-row style="padding-top: 30px">
          <!--用户名-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 用户名：</el-col>
            <el-col :span="12" class="content">{{detail.userName}}</el-col>
          </el-col>
          <!--真实姓名-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 真实姓名：</el-col>
            <el-col :span="12" class="content">{{detail.realName}}</el-col>
          </el-col>
        </el-row>
        <!--手机号码／邮箱-->
        <el-row style="padding-top: 10px">
          <!--手机号码-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 手机号：</el-col>
            <el-col :span="12" class="content">{{detail.phone}}</el-col>
          </el-col>
          <!--邮箱-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 邮箱地址：</el-col>
            <el-col :span="12" class="content">{{detail.email}}</el-col>
          </el-col>
        </el-row>
        <!--地址-->
        <el-row style="padding-top: 10px;">
          <!--地址-->
          <el-col :span="22">
            <el-col :span="6" class="title">◆ 地址：</el-col>
            <el-col :span="16" class="content">{{detail.address}}</el-col>
          </el-col>
        </el-row>
        <!--状态-->
        <el-row style="padding-top: 10px;padding-bottom: 30px;">
          <el-col :span="22">
            <el-col :span="6" class="title">◆ 状态：</el-col>
            <el-col :span="16" class="content">
              <span v-if="detail.status === '1'">正常</span>
              <span v-else>禁用</span>
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
  export default {
    data() {
      return {
        // 搜索框的数据
        searchData: {
          realName: "",
          userName: ""
        },
        // 表格数据
        tableData: [
          {
            id: "1",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            id: "2",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            id: "3",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            id: "4",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          }, {
            id: "5",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          }, {
            id: "6",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            id: "7",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            id: "8",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          }, {
            id: "9",
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
        ],

        // 是否显示查看详情弹窗
        showDetail: false,
        // 详情弹窗里的数据
        detail: {},
      }
    },
    methods: {
      // 录入用户
      handleAdd() {
        this.$router.push({path: "/user/add"});
      },
      // 删除用户
      handleDelete(data) {
        const that = this;
        that.$confirm('此操作将删除该用户, 是否继续?', '提示', {
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
      // 编辑用户
      handleEdit(data) {
        this.$router.push({name: 'editUser', params: {id: data.id}});
      },
      // 查看详情
      handleDetail(data) {
        this.showDetail = true;

        this.detail = {
          id: "1",
          userName: "huangliya",
          realName: '黄猪崽' + data.id,
          phone: "13246825048",
          email: "418607528@qq.com",
          address: "广东药科大学生活区1栋362",
          status: "1"
        }
//        alert(data.realName)
      }

    }
  }
</script>

<style>


  .title2 {
    width: 70px;
    height: 60px;
    color: #909399;
    text-align: right;
  }

  .input {
    width: 160px;
    height: 60px;
  }

</style>
