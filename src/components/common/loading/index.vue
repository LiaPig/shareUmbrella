<template>
  <div style="text-align: center;font-size: 50px;">
    <el-row style="position: fixed;top: 35%;left: 49%">
      <i class="el-icon-loading"></i>
    </el-row>
    <el-row style="position: fixed;top: 45%;left: 47%;font-size: 35px">
      加载中...
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {},
    mounted() {
      const path = this.$route.params.path;
      if(path === '/user') {
        this.$router.push({path: path});
        this.$message.warning("数据丢失,请重新选择要编辑的用户")
      }
    },
  }

</script>

<style>
  #clhTable tr {
   display: block;
 }
</style>
