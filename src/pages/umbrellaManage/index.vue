<template>
  <div class="umbrellaContainer">
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 雨伞管理</el-row>
      <el-row class="search">
        <!--雨伞id-->
        <el-col class="title2" style="width: 80px;">雨伞id：</el-col>
        <el-col class="input" style="width: 210px">
          <el-input
            placeholder="请输入雨伞id"
            prefix-icon="el-icon-search"
            v-model="searchData.id">
          </el-input>
        </el-col>
        <!--租借点代号-->
        <el-col class="title2" style="width: 80px">租借点：</el-col>
        <el-col class="input">
          <el-select v-model="searchData.rentPointId" placeholder="请选择租借点">
            <el-option
              v-for="item in locationOptions"
              :key="item.id"
              :label="item.rentName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <!--查询按钮-->
        <el-col style="width: 80px;margin-left: 20px">
          <el-button @click="handleSearch" type="primary" size="small" icon="el-icon-search" style="height: 40px">查询</el-button>
        </el-col>
        <!--重置按钮-->
        <el-col style="width: 80px;margin-left: 10px;">
          <el-button @click="handleReset" type="warning" size="small" icon="iconfont icon-chexiao" style="height: 40px;margin-top: 10px"> 重置</el-button>
        </el-col>
        <!--雨伞录入按钮-->
        <el-col :span="3" style="float: right;text-align: right;">
          <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">雨伞录入</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!--雨伞管理表格-->
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
            label="雨伞编号"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            label="雨伞类型"
            width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.type === '1'">长柄伞</span>
              <span v-else-if="scope.row.type === '2'">短款折叠伞</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="pattern"
            label="雨伞型号"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            label="状态"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '0'">禁用</span>
              <span v-if="scope.row.status === '1'">正常</span>
              <span v-if="scope.row.status === '2'">已报修</span>
              <span v-if="scope.row.status === '3'">修理中</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="rentPointId"
            label="租借点Id"
            width="200">
          </el-table-column>
          <el-table-column
            sortable
            label="是否被租用"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.beRented === '0'">否</span>
              <span v-else-if="scope.row.beRented === '1'">是</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="userId"
            label="租用的用户id"
            width="180">
          </el-table-column>
          <el-table-column
            sortable
            prop="beRentedNumber"
            label="被租借次数"
            width="150">
          </el-table-column>
          <el-table-column
            label="二维码"
            width="200">
            <template slot-scope="scope">
              <el-popover
                ref="popover1"
                placement="top-start"
                width="200"
                trigger="click">
                <qrcode-vue :value="scope.row.id" size="200" level="H"></qrcode-vue>
              </el-popover>
              <el-button v-popover:popover1 size="small">点击查看</el-button>
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
        <!--雨伞类型/雨伞型号-->
        <el-row>
          <!--雨伞类型-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="雨伞类型:" prop="type">
              <el-select v-model="form.type" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--雨伞型号-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="雨伞型号:" prop="pattern">
              <el-input v-model="form.pattern" placeholder="请输入雨伞型号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--租借点/雨伞状态-->
        <el-row style="margin-top: 20px;">
          <!--租借点-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="可租借点:" prop="rentPointId">
              <el-select v-model="form.rentPointId" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in canRentLocationOptions"
                  :key="item.id"
                  :label="item.rentName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--雨伞状态-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="雨伞状态:" prop="beRentedNumber">
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
        <!--正被租用/用户的id-->
        <el-row style="margin-top: 20px;">
          <!--正被租用-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="正被租用:" prop="beRented">
              <el-select v-model="form.beRented" placeholder="请选择" :disabled="formType === 1" style="width: 100%">
                <el-option
                  v-for="item in beRentedOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--用户的id-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="用户的id:" prop="userId">
              <el-input v-model="form.userId" :disabled="formType === 1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--被租次数-->
        <el-row style="margin-top: 20px;">
          <!--被租次数-->
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10" style="height: 40px;">
            <el-form-item label="被租次数:" prop="beRentedNumber">
              <el-input v-model="form.beRentedNumber" :disabled="formType === 1"></el-input>
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
    <el-dialog title="查看雨伞详情" :visible.sync="showDetail" width="60%">
      <el-row class="dialogDetail">
        <!--雨伞编号／雨伞类型-->
        <el-row style="padding-top: 30px">
          <!--雨伞编号-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 雨伞编号：</el-col>
            <el-col :span="12" class="content">{{detail.id}}</el-col>
          </el-col>
          <!--雨伞类型-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆&nbsp;&nbsp;雨伞类型&nbsp;&nbsp;：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.type === '1'">长柄伞</span>
              <span v-if="detail.type === '2'">短款折叠伞</span>
              <!--<span v-else>禁用</span>-->
            </el-col>
          </el-col>
        </el-row>
        <!--雨伞型号／可租借点ID-->
        <el-row style="padding-top: 20px">
          <!--雨伞型号-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆&nbsp;雨伞型号：</el-col>
            <el-col :span="12" class="content">{{detail.pattern}}</el-col>
          </el-col>
          <!--可租借点ID-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 可租借点ID：</el-col>
            <el-col :span="12" class="content">{{detail.rentPointId}}</el-col>
          </el-col>
        </el-row>
        <!--用户的id／正被租用-->
        <el-row style="padding-top: 20px">
          <!--用户的id-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 用户的id：</el-col>
            <el-col :span="12" class="content">{{detail.userId}}</el-col>
          </el-col>
          <!--正被租用-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 是否被租用：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.beRented === '0'">否</span>
              <span v-if="detail.beRented === '1'">是</span>
            </el-col>
          </el-col>
        </el-row>
        <!--雨伞状态／被租借次数-->
        <el-row style="padding-top: 20px">
          <!--雨伞状态-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 雨伞状态：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.status === '0'">禁用</span>
              <span v-if="detail.status === '1'">正常</span>
              <span v-if="detail.status === '2'">已报修</span>
              <span v-if="detail.status === '3'">修理中</span>
            </el-col>
          </el-col>
          <!--被租借次数-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 被租借次数：</el-col>
            <el-col :span="12" class="content">{{detail.beRentedNumber}}</el-col>
          </el-col>
        </el-row>
        <!--二维码-->
        <el-row style="padding-top: 20px;margin-bottom: 20px">
          <!--二维码-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆&nbsp;&nbsp;二维码&nbsp;&nbsp;：</el-col>
            <el-col :span="12" class="content">
              <qrcode-vue :value="detail.id" size="100" level="H"></qrcode-vue>
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
  import QrcodeVue from 'qrcode.vue';
  import {getLocations} from 'Api/location'
  import {getUmbrellas, addUmbrella, updateUmbrella, deleteUmbrella, searchUmbrellaById, searchUmbrellaByRentId} from 'Api/umbrella'

  export default {
    data() {
      return {
        // 租借点选项数据
        locationOptions: [],
        // 可以被录入雨伞的租借点选项
        canRentLocationOptions: [],
        // 搜索的数据
        searchData: {
          id: "",
          rentPointId: ""
        },
        // 是否显示菜单录入弹窗
        showDialog: false,
        // 弹窗类型(1:录入，2:编辑)
        formType: 1,
        // 弹窗标题
        formTitle: "",
        // 录入弹窗里的表单
        form: {},
        // 雨伞类型选项
        typeOptions: [
          {
            value: '1',
            label: '长柄伞'
          },
          {
            value: '2',
            label: '短款折叠伞'
          },
        ],
        // 正被租用选项
        beRentedOptions: [
          {
            value: '0',
            label: '否'
          },
          {
            value: '1',
            label: '是'
          },
        ],
        // 状态选项
        statusOptions: [
          {
            value: '0',
            label: '禁用'
          },
          {
            value: '1',
            label: '正常'
          },
          {
            value: '2',
            label: '已报修'
          },
          {
            value: '3',
            label: '修理中'
          },

        ],
        // 弹窗里的表单认证
        formRules: {
          pattern: [
            {required: true, message: '请输入型号', trigger: 'blur'},
            {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择雨伞类型', trigger: 'change'},
          ],
          region: [
            {required: true, message: '请选择所在地区', trigger: 'change'},
          ],
          rentPointId: [
            {required: true, message: '请选择可租借点', trigger: 'change'},
          ],
          beRented: [
            {required: true, message: '请选择是否被租用', trigger: 'change'},
          ],
          // userId: [
          //   {required: true, message: '请填写租用的用户id', trigger: 'blur'},
          // ],
          beRentedNumber: [
            {required: true, message: '请填写被租借次数', trigger: 'blur'},
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },

        // 表格数据
        tableData: [],
        // 表格loading
        tableLoading: true,
        // 是否显示详情弹窗
        showDetail: false,
        // 详情弹窗的数据
        detail: {},


      };
    },
    components: {
      QrcodeVue
    },
    methods: {
      // 获取租借点的id和名字组装成一个数组作为选项
      getLocationOptions() {
        const that = this;
        that.$http.get(getLocations)
          .then(res => {
            let array = res.data.data;
            let locationOptions = [];
            let canRentLocationOptions = [];
            for (let i = 0; i < array.length; i++) {
              if (array[i].status !== "0") {
                let obj = {
                  id: array[i].id,
                  rentName: array[i].rentName
                };
                locationOptions.push(obj);
                if(array[i].returnNum > 0) {
                  canRentLocationOptions.push(obj);
                }
              }
            }
            that.locationOptions = locationOptions;
            that.canRentLocationOptions = canRentLocationOptions;
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取表格数据
      getTableData() {
        const that = this;
        that.tableLoading = true;
        that.$http.get(getUmbrellas)
          .then(res => {
            that.tableData = res.data.data;
            that.tableLoading = false;
          })
          .catch(err => {
            console.error(err);
          })
      },

      // 点击雨伞录入按钮
      handleAdd() {
        this.formType = 1;
        this.formTitle = "雨伞录入";
        this.form = {
          pattern: "",
          type: "",
          rentPointId: "",
          beRented: "0",
          userId: "",
          beRentedNumber: 0,
          status: "1",
        };
        // 打开弹窗
        this.showDialog = true;
      },
      // 点击查询
      handleSearch() {
        const that = this;
        const searchData = that.searchData;
        if(!searchData.id && !searchData.rentPointId) {
          that.$message.warning("请先填写数据再查询");
        }
        else if (searchData.id){
          that.tableLoading = true;
          that.$http.get(searchUmbrellaById + searchData.id)
            .then(res => {
              let array = [];
              // 如果返回有结果
              if(res.data.data) {
                array.push(res.data.data);
                that.tableData = array;
              }
              else {
                that.tableData = array;
              }

              that.$message.success("根据雨伞id查询成功！")
            })
            .catch(err => {
              console.error(err);
            });
          that.tableLoading = false;
        }
        else if(searchData.rentPointId) {
          that.tableLoading = true;
          that.$http.get(searchUmbrellaByRentId + searchData.rentPointId + "/umbrellas")
            .then(res => {
              that.tableData = res.data.data;
              that.$message.success("根据租借点查询成功！")
            })
            .catch(err => {
              console.error(err);
            });
          that.tableLoading = false;
        }
      },
      // 点击重置
      handleReset() {
        this.searchData = {
          id: "",
          rentPointId: ""
        };
        this.getTableData();
      },

      // 点击某一行里的编辑按钮
      handleEdit(data) {
        this.formType = 2;
        this.formTitle = "编辑雨伞";
        // 根据id获取雨伞信息
        this.$http.get(searchUmbrellaById + data.id)
          .then(res => {
            this.form = res.data.data;
            // 打开弹窗
            this.showDialog = true;
          })
          .catch(err => {
            console.error(err);
          })
      },
      // 点击弹窗里的确认按钮(formType,2为编辑)
      formSubmit() {
        const that = this;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            // 1.录入(新增)
            if (this.formType === 1) {
              let params = this.form;
              that.$http.post(addUmbrella, params)
                .then(res => {
                  that.$message.success("录入成功！");
                  that.getTableData();
                })
                .catch(err => {
                  console.error(err);
                })
            }
            // 2.编辑(修改)
            else if (this.formType === 2) {
              let params = {
                beRented: this.form.beRented,
                beRentedNumber: this.form.beRentedNumber,
                id: this.form.id,
                pattern: this.form.pattern,
                rentPointId: this.form.rentPointId,
                status: this.form.status,
                type: this.form.type,
              };
              that.$http.post(updateUmbrella, params)
                .then(res => {
                  that.$message.success("修改成功！");
                  that.getTableData();
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
        that.$confirm('此操作将删除该雨伞, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.delete(deleteUmbrella + data.id)
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
      this.getLocationOptions();
      this.getTableData();

    }
  }

</script>

<style>
  .umbrellaContainer .warning {
    margin-left: 10px;
    padding-top: 5px;
    font-size: 8px;
    line-height: 30px;
    color: #aaa;
    text-align: left;
  }

  .umbrellaContainer .title2 {
    width: 70px;
    height: 60px;
    color: #909399;
    text-align: right;
  }

  .umbrellaContainer .input {
    width: 160px;
    height: 60px;
  }
</style>
