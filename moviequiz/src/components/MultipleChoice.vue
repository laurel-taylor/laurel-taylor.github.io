<template>
  <div class="multiple-choice">
    <p class="question">{{ question }}</p>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    question: String,
    answers: Array,
  },

  data() {
      return {
        clicked: [],
      };
  },
};
</script>

<style lang="scss" scoped>

</style>
