<template>
  <div id="app">
    <ListLayout msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import ListLayout from "@/components/ListLayout";

export default {
  name: "App",

  components: {
    ListLayout
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}

.own,
tr.own {
  background-color: #fff9c4;
  font-weight: 500;
}
</style>
