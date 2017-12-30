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
    <el-row class="user_table">
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
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },{
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },{
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
          {
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },{
            userName: "huangliya",
            realName: '黄猪崽',
            phone: "13246825048",
            email: "418607528@qq.com",
            address: "广东药科大学生活区1栋362",
            status: "1"
          },
        ],
      }
        ;
    },
    methods: {
      // 录入用户
      handleAdd() {
        this.$router.push({path:"/user/add"});
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
        alert(data.realName)
      },
      // 查看详情
      handleDetail(data) {
        alert(data.realName)
      }

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

  .search {
    float: left;
    margin-left: 20px;
    width: calc(100% - 40px);
    height: 60px;
    line-height: 60px;
    font-size: 14px;
  }

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

  .user_table {
    margin-top: 20px;
    width: 94%;
    height: 550px;
    padding: 10px 10px 10px 10px;
    overflow: auto;
    margin-left: 3%;
    background-color: #ffffff;
  }
  .el-table th{
    background-color: #eef1f6;
    text-align: center;
    color: black;
  }
</style>
