<template>
  <div class="topNav_container" :style="{'padding-left': paddingWidth + 'px'}">
    <div @click="changeCollapse" class="changeCollapse" :style="{'padding-left': paddingWidth + 'px'}">
      <i :class="iconClass" style="font-size: 30px"></i>
    </div>
    <div class="user">
      <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        欢迎你,{{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        // 距离左边的宽度
        paddingWidth: 220,
        iconClass: "iconfont icon-liebiaoxingshi",
        // 登录的用户名
        name: "黄猪崽",
      };
    },
    methods: {
      changeCollapse() {
        let isCollapse = this.isCollapse;
        // 收起状态 --> 展开状态
        if(isCollapse) {
          this.$store.commit('setIsCollapse',false)
        }
        else {
          this.$store.commit('setIsCollapse',true)
        }
      },
      handleCommand(command) {
        if(command === "exit") {
          this.$store.commit('setIsLogin', false);
          window.localStorage.setItem('isLogin', false);
          this.$notify({
            title: '退出登录成功',
            message: '请重新登录',
            type: 'success'
          });
          this.$router.push({path: '/login'});
        }
      }
    },
    computed: {
      ...mapGetters([
        // 导航条是否收起（true：收起，false：展开）
        'isCollapse'
      ]),
    },
    watch: {
      'isCollapse': function () {
        // 收起状态
        if(this.isCollapse) {
          this.paddingWidth = 85;
          this.iconClass = "iconfont icon-qiapianxingshi";
        }
        else {
          this.paddingWidth = 220;
          this.iconClass = "iconfont icon-liebiaoxingshi";
        }
      }
    }
  }

</script>

<style>
  .topNav_container{
    position: absolute;
    right: 0;
    width: 100%;
    height: 50px;
    background-color: #707880;
  }
  .changeCollapse {
    display: inline-block;
    float:left;
    background-color: #707880;
    border: none;
    width: 50px;
    height: 50px;
    line-height: 50px;
    color: #ffd04b;
  }
  .user {
    position: absolute;
    right: 30px;
    height: 50px;
    line-height: 50px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #ffd04b;
  }
</style>
