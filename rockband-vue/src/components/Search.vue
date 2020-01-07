<template>
  <div>
    <input
      v-model="search"
      class="search"
      @change="updateSearch"
      type="search"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    updateSearch() {
      this.$emit("update", this.search);
    }
  }
};
</script>

<style scoped></style>
