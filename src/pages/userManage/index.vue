<template>
  <div class="user_container">
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 用户管理</el-row>
      <el-row class="search">
        <!--开发者平台ID-->
        <el-col class="title2" style="width: 120px;">开发者平台ID：</el-col>
        <el-col class="input">
          <el-input
            placeholder="请输入"
            prefix-icon="el-icon-search"
            v-model="searchData.realName">
          </el-input>
        </el-col>
        <!--用户名-->
        <el-col class="title2">微信名：</el-col>
        <el-col class="input">
          <el-input
            placeholder="请输入微信名"
            prefix-icon="el-icon-search"
            v-model="searchData.nickName">
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
            prop="openId"
            label="开发者平台ID"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            prop="nickName"
            label="微信名"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="gender"
            label="性别"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.gender === 1">男</span>
              <span v-else-if="scope.row.gender === 2">女</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="deposit"
            label="押金(元)"
            width="120">
          </el-table-column>
          <el-table-column
            sortable
            prop="usageCount"
            label="租借次数"
            width="120">
          </el-table-column>
          <el-table-column
            label="微信头像"
            width="150">
            <template slot-scope="scope">
              <el-button v-popover:popover1 size="small">点击查看</el-button>
              <el-popover
                ref="popover1"
                placement="top-start"
                width="200"
                trigger="click">
                <img :src="scope.row.avatarUrl" style="width: 200px;height: 200px"/>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            sortable
            prop="city"
            label="城市"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="province"
            label="省份"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="country"
            label="国家"
            width="150">
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
        <!--微信头像／微信ID-->
        <el-row style="padding-top: 30px">
          <!--微信头像-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 微信头像：</el-col>
            <el-col :span="12" class="content">
              <img :src="detail.avatarUrl" style="width: 50px;height: 50px;border: 1px solid darkgrey"/>
            </el-col>
          </el-col>
          <!--微信ID-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 微信&nbsp;&nbsp;ID&nbsp;：</el-col>
            <el-col :span="12" class="content">{{detail.openId}}</el-col>
          </el-col>
        </el-row>
        <!--微信名称／性别-->
        <el-row style="padding-top: 20px">
          <!--微信名称-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 微信名称：</el-col>
            <el-col :span="12" class="content">{{detail.nickName}}</el-col>
          </el-col>
          <!--性别-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别&nbsp;：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.gender === 1">男</span>
              <span v-else-if="detail.gender === 2">女</span>
            </el-col>
          </el-col>
        </el-row>
        <!--押金金额／租借次数-->
        <el-row style="padding-top: 20px">
          <!--押金金额-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 押金金额：</el-col>
            <el-col :span="12" class="content">{{detail.deposit}}&nbsp;元</el-col>
          </el-col>
          <!--租借次数-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 租借次数：</el-col>
            <el-col :span="12" class="content">{{detail.usageCount}}&nbsp;次</el-col>
          </el-col>
        </el-row>
        <!--国家地区／微信ID-->
        <el-row style="padding-top: 20px">
          <!--国家地区-->
          <el-col :span="22">
            <el-col :span="6" class="title">◆ 国家地区：</el-col>
            <el-col :span="16" class="content">{{detail.country+ " " + detail.province+ " " +detail.city}}</el-col>
          </el-col>
        </el-row>
        <!--状态-->
        <el-row style="padding-top: 20px;padding-bottom: 30px;">
          <el-col :span="22">
            <el-col :span="6" class="title">◆ 状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态&nbsp;：</el-col>
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
          openId: "",
          nickName: ""
        },
        // 表格数据
        tableData: [
          {
            id: "1",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          },
          {
            id: "2",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          },
          {
            id: "3",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          },
          {
            id: "4",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          }, {
            id: "5",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          }, {
            id: "6",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          },
          {
            id: "7",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          },
          {
            id: "8",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
            status: "1"
          }, {
            id: "9",
            openId: "8008208820",
            nickName: "Lia黄丽雅",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/d9ZyJzoqENWX6bmqJee1ZwONZYY01wib2KAIibT1KQIZhIBdnRGtg4bicMbb7Eia809lSIUNOyWHvr9iaPjTnrjWx0Q/0",
            city: "Guangzhou",
            province: "Guangdong",
            country: "China",
            gender: 2,
            deposit: 200,
            usageCount: 1,
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
        this.detail = data;
        // 打开弹窗
        this.showDetail = true;
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
