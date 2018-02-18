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
          <el-button @click="handleSearch" type="primary" size="small" icon="el-icon-search" style="height: 40px">查询</el-button>
        </el-col>
        <!--重置按钮-->
        <el-col style="width: 80px;margin-left: 10px;">
          <el-button @click="handleReset" type="warning" size="small" icon="iconfont icon-chexiao" style="height: 40px;margin-top: 10px"> 重置</el-button>
        </el-col>

        <!--租借点录入按钮-->
        <el-col :span="3" style="float: right;text-align: right;">
          <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">租借点录入</el-button>
        </el-col>
      </el-row>

    </el-row>
    <!--租借点管理表格-->
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
            label="租借点id"
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
            prop="returnNum"
            label="可归还的伞座量"
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
    <!--录入／编辑弹出框-->
    <el-dialog :title="formTitle" :visible.sync="showDialog">
      <el-form :model="form" ref="form" label-width="100px" :rules="formRules">
        <!--租借点名称/容量-->
        <el-row>
          <!--租借点名称-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="租借点名称:" prop="rentName">
              <el-input v-model="form.rentName" placeholder="请输入租借点名称"></el-input>
            </el-form-item>
          </el-col>
          <!--容量-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="容量:" prop="capacity">
              <el-input-number v-model="form.capacity" :min="0" controls-position="right"
                               style="width: 100%"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <!--可租伞数量/可还伞座量-->
        <el-row style="margin-top: 20px;">
          <!--可租伞数量-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="可租伞数量:" prop="beRentedNum">
              <el-input-number v-model="form.beRentedNum" :min="0" controls-position="right"
                               style="width: 100%"></el-input-number>
            </el-form-item>
          </el-col>
          <!--可还伞座量-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="可还伞座量:" prop="returnNum">
              <el-input-number v-model="form.returnNum" :min="0" controls-position="right"
                               style="width: 100%"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <!--租借点状态-->
        <el-row style="margin-top: 20px;">
          <!--租借点状态-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="租借点状态:" prop="status">
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
    <el-dialog title="查看租借点详情" :visible.sync="showDetail" width="60%">
      <el-row class="dialogDetail">
        <!--租借点的id／租借点名称-->
        <el-row style="padding-top: 30px">
          <!--租借点的id-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 租借点的id：</el-col>
            <el-col :span="12" class="content">{{detail.id}}</el-col>
          </el-col>
          <!--租借点名称-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 租借点名称：</el-col>
            <el-col :span="12" class="content">{{detail.rentName}}</el-col>
          </el-col>
        </el-row>
        <!--容量／可租伞数量-->
        <el-row style="padding-top: 20px">
          <!--容量-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆&nbsp;容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</el-col>
            <el-col :span="12" class="content">{{detail.capacity}}</el-col>
          </el-col>
          <!--可租伞数量-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 可租伞数量：</el-col>
            <el-col :span="12" class="content">{{detail.beRentedNum}}</el-col>
          </el-col>
        </el-row>
        <!--可还伞座量／租借点状态-->
        <el-row style="padding-top: 20px;margin-bottom: 30px">
          <!--可还伞座量-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 可还伞座量：</el-col>
            <el-col :span="12" class="content">{{detail.returnNum}}</el-col>
          </el-col>
          <!--租借点状态-->
          <el-col :span="9">
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
  import {getLocations, addLocation, getLocationById, updateLocation, deleteLocation, searchLocation} from 'Api/location'

  export default {
    data() {
      return {
        // 查询数据
        searchData: {
          id: "",
          rentName: ""
        },

        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: true,

        // 是否显示详情弹窗
        showDetail: false,
        // 详情弹窗的数据
        detail: {},

        // 是否显示菜单录入弹窗
        showDialog: false,
        // 弹窗类型(1:录入，2:编辑)
        formType: 1,
        // 弹窗标题
        formTitle: "",
        // 录入弹窗里的表单
        form: {},
        // 弹窗里的表单认证
        formRules: {
          rentPoint: [
            {required: true, message: '请输入租借点代号', trigger: 'blur'},
          ],
          rentName: [
            {required: true, message: '请选择租借点名称', trigger: 'blur'},
          ],
          region: [
            {required: true, message: '请选择所在地区', trigger: 'blur'},
          ],
          capacity: [
            {required: true, message: '请填写容量', trigger: 'blur', type: 'number'},
          ],
          beRentedNum: [
            {required: true, message: '请填写可租借的雨伞数目', trigger: 'blur', type: 'number'},
          ],
          returnNum: [
            {required: true, message: '请填写可归还的伞座数目', trigger: 'blur', type: 'number'},
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'blur'},
          ],
        },
        // 状态选项
        statusOptions: [
          {
            value: '0',
            label: '禁用'
          },
          {
            value: '1',
            label: '正常'
          }
        ],
      };
    },
    methods: {
      // 获取表格数据
      getTableData() {
        this.tableLoading = true;
        this.$http.get(getLocations)
          .then(res => {
            this.tableData = res.data.data;
            this.tableLoading = false;
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 点击租借点录入按钮
      handleAdd() {
        this.formType = 1;
        this.formTitle = "租借点录入";
        this.form = {
          rentName: "",
          capacity: 0,
          beRentedNum: 0,
          returnNum: 0,
          status: "1"
        };
        // 打开弹窗
        this.showDialog = true;
      },
      // 点击某一行里的编辑按钮
      handleEdit(data) {
        this.formType = 2;
        this.formTitle = "编辑租借点";
        // 根据id获取租借点
        this.$http.get(getLocationById + data.id)
          .then(res => {
            this.form = data;
            // 打开弹窗
            this.showDialog = true;
          })
          .catch(err => {
            console.error(err);
          })
      },
      // 点击弹窗里的确认按钮(formType,2为编辑)
      formSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            // 1.录入(新增)
            if (this.formType === 1) {
              let params = this.form;
              this.$http.post(addLocation, params)
                .then(res => {
                  this.$message.success("录入成功！");
                  this.getTableData();
                })
                .catch(err => {
                  console.error(err);
                });
            }
            // 2.编辑(修改)
            else if (this.formType === 2) {
              let params = this.form;
              this.$http.post(updateLocation, params)
                .then(res => {
                  this.$message.success("修改成功！");
                  this.getTableData();
                })
                .catch(err => {
                  console.error(err);
                });
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
        that.$confirm('此操作将删除该租借点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.delete(deleteLocation + data.id)
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
      // 点击某一行里的查看详情
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

<style>
  .locationContainer .title2 {
    width: 70px;
    height: 60px;
    color: #909399;
    text-align: right;
  }

  .locationContainer .input {
    width: 220px;
    height: 60px;
  }

</style>
