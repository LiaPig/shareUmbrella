<template>
    <div class="locationContainer">
      <!--标题／操作按钮行-->
      <el-row class="top_row">
        <el-row class="title1">:) 租借点管理</el-row>
        <el-row class="search">
          <!--租借点id-->
          <el-col class="title2" style="width: 80px;">租借点id：</el-col>
          <el-col class="input">
            <el-input
              placeholder="请输入租借点id"
              prefix-icon="el-icon-search"
              v-model="searchData.id">
            </el-input>
          </el-col>
          <!--租借点名称-->
          <el-col class="title2" style="width: 100px">租借点名称：</el-col>
          <el-col class="input">
            <el-input
              placeholder="请输入租借点名称"
              prefix-icon="el-icon-search"
              v-model="searchData.rentName">
            </el-input>
          </el-col>
          <!--查询按钮-->
          <el-col style="width: 80px;margin-left: 20px">
            <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>
          </el-col>

          <!--雨伞录入按钮-->
          <el-col :span="3" style="float: right;text-align: right;">
            <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">雨伞录入</el-button>
          </el-col>
        </el-row>

      </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              searchData: {
                id: "",
                rentName: ""
              },
            };
        },
        methods: {
          // 点击租借点录入按钮
          handleAdd() {

          }
        }
    }
</script>

<style>
  .locationContainer .title2 {
    width: 70px;
    height: 60px;
    color: #909399;
    text-align: right;
  }
  .locationContainer .input {
    width: 160px;
    height: 60px;
  }
</style>
