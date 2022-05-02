<template>
  <div id="app" style="  height:80%; overflow-y: scroll;">
    <test />
    <router-view />
  </div>
</template>
<script>
import test from "@/views/test";
export default {
  name: "app",
  components: { test },
  data() {
    return { index: 0 };
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #344352;


}

nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
