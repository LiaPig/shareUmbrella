<template>
  <div>
    <i class="el-icon-loading" style="font-size: 50px;position: fixed;top: 40%;"></i>
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

</style>
