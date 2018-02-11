<template>
  <div class="leftNav_container" v-on:mouseover="isCloseNav(false)" @mouseout="isCloseNav(true)">
    <!--@open="handleOpen"-->
    <!--@close="handleClose"-->
    <el-menu defaultActive="/home"
             router
             class="el-menu-vertical-demo menu"
             :collapse="isCollapse"
             backgroundColor="#545c64"
             textColor="#fff"
             activeTextColor="#ffd04b"
             @mouseover="test()">
      <!--
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      -->
      <el-menu-item v-for="item in menuList" :key="item.key" :index="item.path">
        <i :class="item.icon" style="font-size: 20px;padding-right: 8px;"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {getMenus} from 'Api/menu'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        menuList: [],
      };
    },
    methods: {
      // 是否收起导航条
      isCloseNav(value) {
        this.$store.commit('setIsCollapse',value)
      },
    },
    computed: {
      ...mapGetters([
        // 导航条是否收起
        'isCollapse'
      ]),
    },
    mounted() {
      this.$http.get(getMenus)
        .then(res => {
          this.menuList = res.data.data;
          console.log(res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

</script>

<style>
  .leftNav_container{
    position: absolute;
    height: 100%;
    background-color: #707880;
    text-align: left;
    z-index: 99;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
