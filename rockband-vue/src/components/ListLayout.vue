<template>
  <div class="list">
    <Search @update="updateSearch" ref="search" />
    <List class="list" :search="search" @searchAgain="searchAgain" />
    <Footer />
    <i
      class="glyphicon glyphicon-circle-arrow-up scroll-top"
      @click="scrollTop"
    />
  </div>
</template>

<script>
import List from "@/components/List";
import Search from "@/components/Search";
import Footer from "@/components/Footer";

export default {
  name: "ListLayout",

  components: {
    List,
    Search,
    Footer
  },

  data() {
    return {
      search: ""
    };
  },
  methods: {
    updateSearch(search) {
      this.search = search;
    },
    searchAgain() {
      this.$refs.search.searchAgain();
    },
    scrollTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
.scroll-top {
  cursor: pointer;
  position: fixed;
  top: 95vh;
  right: 0;
  color: #4685c4;
  padding: 1rem;
  z-index: 1;
  font-size: 2rem;
  opacity: 0.3;
  transition: all 0.2s ease-in-out;
}

.scroll-top:hover {
  opacity: 1;
}

.list {
  /* margin-top: 50px; */
}

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
