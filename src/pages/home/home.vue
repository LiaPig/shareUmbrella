<template>
  <div>
    <!--标题-->
    <el-row class="title_row">
      <el-row>共享雨伞管理后台</el-row>
      <el-row style="padding-top: 15px;color: #7D8EAC">开发者：Lia</el-row>
    </el-row>
    <!--卡片-->
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <!--用户总数-->
      <el-col :span="5">
        <div @mouseover="changeIconClass(true, 0)" v-on:mouseout="changeIconClass(false, 0)">
          <el-card class="box-card" style="height: 120px">
            <el-col :span="9" style="height: 80px;line-height: 80px;color: #67C23A;" :class="{ active1: isActive[0] }">
              <i class="iconfont icon-pengyoufill" style="font-size: 50px;"></i>
            </el-col>
            <el-col :span="15">
              <el-row class="title">用户总数</el-row>
              <el-row class="data">12345</el-row>
            </el-col>
          </el-card>
        </div>
      </el-col>

      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="5">
        <div @mouseover="changeIconClass(true, 1)" v-on:mouseout="changeIconClass(false, 1)">
          <el-card class="box-card" style="height: 120px">
            <el-col :span="9" style="height: 80px;line-height: 80px;color: red;" :class="{ active2: isActive[1] }">
              <i class="iconfont icon-yusanjiehuan" style="font-size: 50px;"></i>
            </el-col>
            <el-col :span="15">
              <el-row class="title">雨伞总数</el-row>
              <el-row class="data" style="color: red;">67890</el-row>
            </el-col>
          </el-card>
        </div>
      </el-col>

      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="5">
        <div @mouseover="changeIconClass(true, 2)" v-on:mouseout="changeIconClass(false, 2)">
          <el-card class="box-card" style="height: 120px">
            <el-col :span="9" style="height: 80px;line-height: 80px;color: #409EFF;" :class="{ active3: isActive[2] }">
              <i class="iconfont icon-wxbmingxingdianpu" style="font-size: 50px;"></i>
            </el-col>
            <!--<el-col :span="">&nbsp;</el-col>-->
            <el-col :span="15">
              <el-row class="title">租借点总数</el-row>
              <el-row class="data" style="color: #409EFF;">66666</el-row>
            </el-col>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!--轮播图-->
    <el-row class="carousel" style="padding-top: 50px">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in pictures" :key="item">
          <img :src="item" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </el-row>

  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {ElCol},
    data() {
      return {
        pictures: [
          '../../../src/assets/pictures/home/carousel/1.jpeg',
          '../../../src/assets/pictures/home/carousel/2.jpg',
          '../../../src/assets/pictures/home/carousel/3.jpg',
          '../../../src/assets/pictures/home/carousel/4.jpeg',
          '../../../src/assets/pictures/home/carousel/5.jpeg',
        ],
        value2: "",
        isActive: [false]
      };
    },
    methods: {
      changeIconClass(flag, index) {
        let isActive = this.isActive;
        if (flag) {
          isActive[index] = true;
          this.isActive = [];
          this.isActive = isActive;
        }
        else {
          isActive[index] = false;
          this.isActive = [];
          this.isActive = isActive;
        }
      }
    }
  }
</script>

<style>
  .title_row {
    height: 200px;
    padding: 50px 0 10px 55px;
    font-size: 30px;
    color: #475669;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .carousel {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .icon {
    height: 80px;
    line-height: 80px;
    color: #67C23A;
  }

  .active1 {
    background-color: #67C23A;
    color: #ffffff !important;
  }
  .active2 {
    background-color: red;
    color: #ffffff !important;
  }
  .active3 {
    background-color: #409EFF;
    color: #ffffff !important;
  }

  .box-card .title {
    color: #909399;
    height: 40px;
    line-height: 60px;
    font-size: 16px;
    text-align: right;
  }

  .box-card .data {
    height: 40px;
    line-height: 30px;
    color: #67C23A;
    font-size: 18px;
    text-align: right;
  }

</style>
