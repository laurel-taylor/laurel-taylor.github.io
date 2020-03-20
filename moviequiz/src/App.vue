<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/styles/main";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 1rem 3rem;

  @media($small) {
    padding: 0;
  }
}

#nav {
  padding: 1rem;

  @media($small) {
    padding: 0;
  }
}

#nav a {
  font-weight: bold;
  color: $green;
}

ul {
  padding: 0;
  list-style-type: none;
  margin: 0.5rem 0;
}

input {
  font-size: 1.5rem;
  border: 1px solid #aaa;
  width: 94%;
  border-radius: 3px;

  @media($small) {
    padding: 5px;
  }
}

button {
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: $blue;
  color: white;
  cursor: pointer;
}
</style>
