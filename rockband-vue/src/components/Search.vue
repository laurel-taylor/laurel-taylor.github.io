<template>
  <div class="search-container">
    <input
      v-model="search"
      class="search"
      type="search"
      placeholder="Search..."
      ref="search"
    />
    <i
      class="clear tooltip-icon glyphicon glyphicon-remove-circle"
      @click="clear"
    ></i>
  </div>
</template>

<script>
export default {
  name: "Search",
  watch: {
    search: {
      handler() {
        this.updateSearch();
      }
    }
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    updateSearch() {
      this.$emit("update", this.search);
    },
    clear() {
      this.search = "";
      this.updateSearch();
    },
    searchAgain() {
      this.clear();
      this.$refs.search.focus();
    }
  }
};
</script>

<style scoped>
.search-container {
  font-size: 2rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.search {
  /* margin: 5px; */
  width: 100%;
  padding: 5px;
  border: 1px solid #e4e4e4;
}

.clear {
  cursor: pointer;
  font-size: 2rem;
  color: #999999;
  position: absolute;
  right: 1rem;
  top: 0.75rem;
}
</style>
