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
            <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">租借点录入</el-button>
          </el-col>
        </el-row>

      </el-row>
      <!--租借点管理表格-->
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
              prop="rentPoint"
              label="租借点代号"
              width="200">
            </el-table-column>
            <el-table-column
              sortable
              prop="rentName"
              label="租借点名称"
              width="250">
            </el-table-column>
            <el-table-column
              sortable
              prop="region"
              label="地区"
              width="200">
            </el-table-column>
            <el-table-column
              sortable
              prop="capacity"
              label="容量"
              width="150">
            </el-table-column>
            <el-table-column
              sortable
              prop="beRentedNum"
              label="可租借的伞数量"
              width="150">
            </el-table-column>
            <el-table-column
              sortable
              label="状态"
              width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.status === '0'">禁用</span>
                <span v-if="scope.row.status === '1'">正常</span>
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
      <!--查看详情弹窗-->
      <el-dialog title="查看租借点详情" :visible.sync="showDetail">
        <el-row class="dialogDetail">
          <!--租借点号码／租借点名称-->
          <el-row style="padding-top: 30px">
            <!--租借点号码-->
            <el-col :span="11">
              <el-col :span="12" class="title">◆ 租借点号码：</el-col>
              <el-col :span="12" class="content">{{detail.rentPoint}}</el-col>
            </el-col>
            <!--租借点名称-->
            <el-col :span="9">
              <el-col :span="12" class="title">◆ 租借点名称：</el-col>
              <el-col :span="12" class="content">{{detail.rentName}}</el-col>
            </el-col>
          </el-row>
          <!--地区／容量-->
          <el-row style="padding-top: 20px">
            <!--地区-->
            <el-col :span="11">
              <el-col :span="12" class="title">◆&nbsp;地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</el-col>
              <el-col :span="12" class="content">{{detail.region}}</el-col>
            </el-col>
            <!--容量-->
            <el-col :span="9">
              <el-col :span="12" class="title">◆&nbsp;容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</el-col>
              <el-col :span="12" class="content">{{detail.capacity}}</el-col>
            </el-col>
          </el-row>
          <!--可租伞数量／可还伞座量-->
          <el-row style="padding-top: 20px">
            <!--可租伞数量-->
            <el-col :span="11">
              <el-col :span="12" class="title">◆ 可租伞数量：</el-col>
              <el-col :span="12" class="content">{{detail.beRentedNum}}</el-col>
            </el-col>
            <!--可还伞座量-->
            <el-col :span="9">
              <el-col :span="12" class="title">◆ 可还伞座量：</el-col>
              <el-col :span="12" class="content">{{detail.beRentedNum}}</el-col>
            </el-col>
          </el-row>
          <!--租借点状态-->
          <el-row style="padding-top: 20px;margin-bottom: 30px">
            <!--租借点状态-->
            <el-col :span="11">
              <el-col :span="12" class="title">◆&nbsp;租借点状态：</el-col>
              <el-col :span="12" class="content">
                <span v-if="detail.status === '0'">禁用</span>
                <span v-if="detail.status === '1'">正常</span>
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
              // 查询数据
              searchData: {
                id: "",
                rentName: ""
              },
              // 表格数据
              tableData: [
                {
                  id: "8008208820",
                  rentPoint: "023",
                  rentName: "大学城南",
                  region: "广州",
                  capacity: 100,
                  beRentedNum: 80,
                  returnNum: 20,
                  status: "1"
                }
              ],
              // 是否显示详情弹窗
              showDetail: false,
              // 详情弹窗的数据
              detail: {},
            };
        },
        methods: {
          // 点击租借点录入按钮
          handleAdd() {

          },
          // 点击某一行里的删除按钮
          handleDelete(data) {
            const that = this;
            that.$confirm('此操作将删除该租借点, 是否继续?', '提示', {
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
          },
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
