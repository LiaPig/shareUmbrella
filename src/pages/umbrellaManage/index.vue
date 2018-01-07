<template>
  <div>
    <!--标题／操作按钮行-->
    <el-row class="top_row">
      <el-row class="title1">:) 雨伞管理</el-row>
      <el-row class="search">
        <!--雨伞录入按钮-->
        <el-col :span="3" style="float: right;text-align: right;">
          <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd">雨伞录入</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!--雨伞管理表格-->
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
            prop="region"
            label="所在地区"
            width="180">
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
            label="二维码"
            width="200">
            <template slot-scope="scope">
              <el-button v-popover:popover1 size="small">点击查看</el-button>
              <el-popover
                ref="popover1"
                placement="top-start"
                width="200"
                trigger="click">
                <qrcode-vue :value="scope.row.id" size="200" level="H"></qrcode-vue>
              </el-popover>
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
        <!--雨伞类型-->
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="雨伞类型:" prop="type">
              <el-select v-model="form.type" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in typeOptins"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--雨伞型号-->
        <el-row style="margin-top: 20px;">
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="雨伞型号:" prop="pattern">
              <el-input v-model="form.pattern" placeholder="请输入雨伞型号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--所在地区-->
        <el-row style="margin-top: 20px;">
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="所在地区:" prop="region">
              <el-select v-model="form.region" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in regionOptins"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--状态-->
        <el-row style="margin-top: 20px;">
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="11" style="height: 40px;">
            <el-form-item label="状态:" prop="status">
              <el-select v-model="form.status" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in statusOptins"
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
    <!--菜单详情弹窗-->
    <el-dialog title="查看雨伞详情" :visible.sync="showDetail">
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
            <el-col :span="12" class="title">◆ 雨伞类型：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.type === '1'">长柄伞</span>
              <span v-if="detail.type === '2'">短款折叠伞</span>
              <!--<span v-else>禁用</span>-->
            </el-col>
          </el-col>
        </el-row>
        <!--所在地区／雨伞型号-->
        <el-row style="padding-top: 20px">
          <!--所在地区-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆ 所在地区：</el-col>
            <el-col :span="12" class="content">{{detail.region}}</el-col>
          </el-col>
          <!--雨伞型号-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 雨伞型号：</el-col>
            <el-col :span="12" class="content">{{detail.pattern}}</el-col>
          </el-col>
        </el-row>
        <!--二维码／雨伞状态-->
        <el-row style="padding-top: 20px;margin-bottom: 20px">
          <!--二维码-->
          <el-col :span="11">
            <el-col :span="12" class="title">◆&nbsp;&nbsp;&nbsp;二维码&nbsp;&nbsp;：</el-col>
            <el-col :span="12" class="content">
              <qrcode-vue :value="detail.id" size="100" level="H"></qrcode-vue>
            </el-col>
          </el-col>
          <!--雨伞状态-->
          <el-col :span="9">
            <el-col :span="12" class="title">◆ 雨伞状态：</el-col>
            <el-col :span="12" class="content">
              <span v-if="detail.status === '0'">禁用</span>
              <span v-if="detail.status === '1'">正常</span>
              <span v-if="detail.status === '2'">已报修</span>
              <span v-if="detail.status === '3'">修理中</span>
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

  export default {
    data() {
      return {
        // 是否显示菜单录入弹窗
        showDialog: false,
        // 弹窗类型(1:录入，2:编辑)
        formType: 1,
        // 弹窗标题
        formTitle: "",
        // 录入弹窗里的表单
        form: {},
        // 雨伞类型选项
        typeOptins: [
          {
            value: '1',
            label: '长柄伞'
          },
          {
            value: '2',
            label: '短款折叠伞'
          },
        ],
        // 所在地区选项
        regionOptins: [
          {
            value: 'gz',
            label: '广州'
          },
          {
            value: 'sz',
            label: '深圳'
          },
        ],
        // 状态选项
        statusOptins: [
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
          status: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },

        // 表格数据
        tableData: [
          {
            id: "8008208820",
            pattern: "L123455",
            type: "2",
            region: "广州",
            status: "1",
          },
          {
            id: "8008208821",
            pattern: "S876543",
            type: "1",
            region: "广州",
            status: "2",
          },
          {
            id: "8008208822",
            pattern: "S876543",
            type: "1",
            region: "广州",
            status: "3",
          },
          {
            id: "8008208823",
            pattern: "L123455",
            type: "2",
            region: "深圳",
            status: "1",
          },
          {
            id: "8008208824",
            pattern: "S876543",
            type: "1",
            region: "深圳",
            status: "1",
          },
          {
            id: "8008208825",
            pattern: "S876543",
            type: "1",
            region: "深圳",
            status: "1",
          },
        ],
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
      // 点击雨伞录入按钮
      handleAdd() {
        this.formType = 1;
        this.formTitle = "雨伞录入";
        this.form = {
          pattern: "",
          type: "",
          region: "",
          status: "1"
        };
        // 打开弹窗
        this.showDialog = true;
      },
      // 点击某一行里的编辑按钮
      handleEdit(data) {
        this.formType = 2;
        this.formTitle = "编辑雨伞";
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
      // 点击某一行里的删除按钮
      handleDelete(data) {
        const that = this;
        that.$confirm('此操作将删除该雨伞, 是否继续?', '提示', {
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
    },
    mounted() {
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
