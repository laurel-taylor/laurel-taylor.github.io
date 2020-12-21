<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body * {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}

button {
  min-width: 80px;
  padding: 5px 10px;
  border-radius: 0;
  font-size: 16px;
  background-color: #f1f1f1;
  border: 1px solid darkslateblue;
  color: darkslateblue;
}

button.selected, button:active {
  color: white;
  background-color: darkslateblue;
}
</style>
