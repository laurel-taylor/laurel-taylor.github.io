<template>
  <div class="search-container">
    <input
      v-model="search"
      :class="['search', { 'has-text': search }]"
      type="search"
      placeholder="Search..."
      ref="search"
    />
    <i
      class="clear tooltip-icon glyphicon glyphicon-remove-circle"
      @click="searchAgain"
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
      search: "",
      isFocus: false
    };
  },
  computed: {
    hasSearch() {
      return this.search || this.isFocus;
    }
  },
  methods: {
    focusSearch() {
      this.$refs.search.focus();
    },
    updateSearch() {
      this.$emit("update", this.search);
    },
    clear() {
      this.search = "";
      this.updateSearch();
    },
    searchAgain() {
      this.clear();
      this.focusSearch();
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

.search:focus + .clear,
.search.hasText + .clear {
  opacity: 1;
}

.clear {
  transition: all 0.2s ease-in-out;
  opacity: 0;
  cursor: pointer;
  font-size: 2rem;
  color: #999999;
  position: absolute;
  right: 0rem;
  top: 0rem;
  padding: 10px;
}
</style>
