<template>
  <div class="hello">
    <top-nav></top-nav>
    <left-nav></left-nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import leftNav from 'Components/common/leftNav/index'
  import topNav from 'Components/common/topNav/index'

  export default {
    name: 'HelloWorld',
    components: {
      leftNav,
      topNav
    },
    data() {
      return {
      }
    },
    methods: {
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .content {
    position: absolute;
    height: calc(100% - 50px);
    width: calc(100% - 64px);
    left: 64px;
    top: 50px;
    /*background-color: #ffffff;*/
  }
</style>
