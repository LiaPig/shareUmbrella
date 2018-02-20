<template>
  <div class="orderContainer">
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 订单管理</el-row>
      <el-row class="search">
        <!--订单id-->
        <el-col class="title2" style="width: 70px;">订单id：</el-col>
        <el-col class="input">
          <el-input
            placeholder="请输入订单id"
            prefix-icon="el-icon-search"
            v-model="searchData.id">
          </el-input>
        </el-col>
        <!--租借点名称-->
        <el-col class="title2" style="width: 100px">租借人名称：</el-col>
        <el-col class="input">
          <el-input
            placeholder="请输入租借人名称"
            prefix-icon="el-icon-search"
            v-model="searchData.nickName">
          </el-input>
        </el-col>
        <!--查询按钮-->
        <el-col style="width: 80px;margin-left: 20px">
          <el-button @click="handleSearch" type="primary" size="small" icon="el-icon-search" style="height: 40px">查询
          </el-button>
        </el-col>
        <!--重置按钮-->
        <el-col style="width: 80px;margin-left: 10px;margin-top: 2px">
          <el-button @click="handleReset" type="warning" size="small" style="height: 40px" icon="iconfont icon-chexiao">
            &nbsp;重置
          </el-button>
        </el-col>
        <!--订单录入按钮-->
        <!--
        <el-col :span="3" style="float: right;text-align: right;">
          <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">订单录入</el-button>
        </el-col>
        -->
      </el-row>
    </el-row>
    <!--菜单管理表格-->
    <el-row class="lia_table" v-loading="tableLoading" element-loading-text="拼命加载中">
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
            prop="id"
            label="订单id"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            label="状态"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '1'">进行中</span>
              <span v-else-if="scope.row.status === '2'">已完成</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="rentName"
            label="租借点名"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="nickName"
            label="租借人姓名"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="startTime"
            label="开始时间"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            prop="returnName"
            label="归还点名"
            width="150">
          </el-table-column>
          <el-table-column
            sortable
            prop="endTime"
            label="结束时间"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            prop="const"
            label="费用(元)"
            width="150">
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
    <!--编辑弹出框-->
    <el-dialog :title="formTitle" :visible.sync="showDialog" width="65%">
      <el-form :model="form" ref="form" label-width="100px" :rules="formRules">
        <!--订单id/租借点名称-->
        <el-row>
          <!--订单id-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="订单id:" prop="id">
              <el-input v-model="form.id" placeholder="请输入订单id"></el-input>
            </el-form-item>
          </el-col>
          <!--租借点名-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="租借点名:" prop="rentName">
              <el-input v-model="form.rentName" placeholder="请输入租借点名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--归还点id/归还点名-->
        <el-row style="margin-top: 10px">
          <!--归还点代号-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="归还点id:">
              <el-input v-model="form.returnPointId" placeholder="请输入归还点id"></el-input>
            </el-form-item>
          </el-col>
          <!--归还点名-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="归还点名:">
              <el-input v-model="form.returnName" placeholder="请输入归还点名"></el-input>
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
          <!--租借人名-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="租借人名:" prop="userId">
              <el-input v-model="form.nickName" placeholder="请输入租借人的用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--开始时间/结束时间-->
        <el-row style="margin-top: 10px">
          <!--开始时间-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="开始时间:">
              <el-date-picker
                v-model="startTime"
                type="datetime"
                placeholder="选择开始时间"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--结束时间-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
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
        <!--订单费用/订单状态-->
        <el-row style="margin-top: 10px">
          <!--订单费用-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="订单费用:" prop="cost">
              <el-input v-model="form.cost" placeholder="请输入订单费用"></el-input>
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


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="warning" @click="formSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看详情弹窗-->
    <el-dialog title="查看订单详情" :visible.sync="showDetail" width="60%">
      <el-row class="dialogDetail">
        <!--订单编号／总计费用-->
        <el-row style="padding-top: 30px">
          <!--雨伞编号-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 订单编号：</el-col>
            <el-col :span="12" class="content">{{detail.id}}</el-col>
          </el-col>
          <!--总计费用-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆&nbsp;总计费用：</el-col>
            <el-col :span="12" class="content">
              <span style="color: red">{{detail.cost}}</span>&nbsp;&nbsp;元
            </el-col>
          </el-col>
        </el-row>
        <!--租借点id／租借点名-->
        <el-row style="padding-top: 20px">
          <!--租借点id-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆&nbsp;租借点id：</el-col>
            <el-col :span="12" class="content">{{detail.rentPointId}}</el-col>
          </el-col>
          <!--可租借点ID-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 租借点名：</el-col>
            <el-col :span="12" class="content">{{detail.rentName}}</el-col>
          </el-col>
        </el-row>
        <!--归还点id／归还点名-->
        <el-row style="padding-top: 20px">
          <!--归还点id-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 归还点id：</el-col>
            <el-col :span="12" class="content">{{detail.returnPointId}}</el-col>
          </el-col>
          <!--归还点名-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 归还点名：</el-col>
            <el-col :span="12" class="content">{{detail.returnName}}</el-col>
          </el-col>
        </el-row>
        <!--租借人id／租借人名-->
        <el-row style="padding-top: 20px;">
          <!--租借人id-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 租借人id：</el-col>
            <el-col :span="12" class="content">
              {{detail.userId}}
            </el-col>
          </el-col>
          <!--租借人名-->
          <el-col :span="10">
            <el-col :span="11" class="title">◆ 租借人名：</el-col>
            <el-col :span="12" class="content">{{detail.nickName}}</el-col>
          </el-col>
        </el-row>
        <!--开始时间／结束时间-->
        <el-row style="padding-top: 20px;">
          <!--开始时间-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 开始时间：</el-col>
            <el-col :span="12" class="content">
              {{detail.startTime}}
            </el-col>
          </el-col>
          <!--结束时间-->
          <el-col :span="10">
            <el-col :span="11" class="title">◆ 结束时间：</el-col>
            <el-col :span="12" class="content">{{detail.endTime}}</el-col>
          </el-col>
        </el-row>
        <!--订单状态-->
        <el-row style="padding-top: 20px;margin-bottom: 20px">
          <!--订单状态-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆&nbsp;订单状态：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.status === '0'">禁用</span>
              <span v-if="detail.status === '1'">进行中</span>
              <span v-if="detail.status === '2'">已完成</span>
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
  import {getOrders, getOrderById, updateOrder, searchOrder, deleteOrder} from "../../api/order";

  export default {
    data() {
      return {
        // 查询的数据
        searchData: {
          id: "",
          nickName: ""
        },

        // 表格数据
        tableData: [
          {
            id: "480285857631178756",
            rentPointId: "480285857631178757",
            rentName: "大学城北",
            returnPointId: "480285857631178758",
            returnName: "大学城南",
            userId: "480285857631178755",
            nickName: "LeeWaiHo",
            startTime: "2018-02-12 23:46:21",
            endTime: "2018-02-14 23:46:21",
            cost: "2.00",
            status: "2"
          }
        ],
        // 表格的loading
        tableLoading: false,

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

        // 查看详情
        detail: {},
        // 是否显示查看详情弹出框
        showDetail: false,

      }
    },
    methods: {
      // 获取表格数据
      getTableData() {
        const that = this;
        that.tableLoading = true;
        this.$http.get(getOrders)
          .then(res => {
            that.tableData = res.data.data;
            // 关闭loading
            that.tableLoading = false;
          })
          .catch(err => {
            console.error(err);
            // 关闭loading
            that.tableLoading = false;
          });
      },

      // 点击查询按钮
      handleSearch() {
        const that = this;
        const searchData = that.searchData;
        if(!searchData.id && !searchData.nickName) {
          that.$message.warning("请先填写数据再查询");
        }
        else {
          that.tableLoading = true;
          that.tableData = [];
          that.$http.get(searchOrder, {params: searchData})
            .then(res => {
              that.tableData = res.data.data;
              that.$message.success("查询成功！")
            })
            .catch(err => {
              console.error(err);
            });
          that.tableLoading = false;
        }
      },
      // 点击重置按钮
      handleReset() {
        this.searchData = {
          id: "",
          nickName: ""
        };
        // 重新获取所有数据
        this.getTableData();
      },

      // 点击某一行里的编辑按钮
      handleEdit(data) {
        this.formType = 2;
        this.formTitle = "编辑订单";
        this.$http.get(getOrderById + data.id)
          .then(res => {
            this.form = res.data.data;
            // 开始时间和结束时间要特别对待
            this.startTime = new Date(data.startTime);
            if(data.endTime) {
              this.endTime = new Date(data.endTime);
            }
            else {
              this.endTime = null;
            }
            // 打开弹窗
            this.showDialog = true;
          })
          .catch(err => {
            console.error(err);
          })
      },
      // 点击弹窗里的确认按钮
      formSubmit() {
        const that = this;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            let params = {
              id: this.form.id,
              rentPointId:this.form.rentPointId,
              rentName: this.form.rentName,
              returnPointId: this.form.returnPointId,
              returnName: this.form.returnName,
              userId: this.form.userId,
              nickName: this.form.nickName,
              startTime: this.baseJs.formatDate.format(this.startTime, 'yyyy-MM-dd hh:mm:ss'),
              endTime: this.baseJs.formatDate.format(this.endTime, 'yyyy-MM-dd hh:mm:ss'),
              cost: Number(this.form.cost),
              status: this.form.status,
            };
            that.$http.post(updateOrder, params)
              .then(res => {
                that.$message.success("修改成功！");
                that.getTableData();
              })
              .catch(err => {
                console.error(err);
              });
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
        that.$confirm('此操作将删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.delete(deleteOrder + data.id)
            .then(res => {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.getTableData();
            })
            .catch(err => {
              console.error(err);
            });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 点击某一行的查看详情
      handleDetail(data) {
        this.detail = data;
        // 打开弹窗
        this.showDetail = true;
      },

    },
    mounted() {
      this.getTableData();
    }
  }
</script>

<style scoped>
  .orderContainer .title2 {
    width: 70px;
    height: 60px;
    color: #909399;
    text-align: right;
  }

  .orderContainer .input {
    width: 210px;
    height: 60px;
  }
</style>
