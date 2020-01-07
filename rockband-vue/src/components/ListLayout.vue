<template>
  <div class="list">
    <Search @update="updateSearch" />
    <Info />
    <List :search="search" />
    <Footer />
  </div>
</template>

<script>
import List from "@/components/List";
import Search from "@/components/Search";
import Footer from "@/components/Footer";
import Info from "@/components/Info";

export default {
  name: "HelloWorld",

  components: {
    List,
    Search,
    Footer,
    Info
  },

  data() {
    return {
      search: ""
    };
  },
  methods: {
    updateSearch(search) {
      this.search = search;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*iphone portrait*/
@media only screen and (min-device-width: 300px) and (max-device-width: 767px) and (orientation: portrait) {
  body,
  table {
    font-size: 16px;
  }
}

/*ipad portrait*/
@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
  body {
    font-size: 22px;
  }
}

/*ipad*/
@media only screen and (min-device-width: 1024px) and (max-device-width: 1100px) {
  body {
    font-size: 22px;
  }
}

/*desktop*/
@media only screen and (min-device-width: 1024px) {
  body {
    font-size: 16px;
    width: 100%;
  }
}
</style>
