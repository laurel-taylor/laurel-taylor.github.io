<template>
  <div class="about">
    <h1>Lord of the Rings: Fellowship of the Ring Quiz</h1>
    <matching v-if="step===0" @next="step++" />
    <div v-if="step>=1">
      Nothing here yet!
      <button @click="step--">Go back</button>
    </div>

  </div>
</template>

<script>
import Matching from '@/fellowship/Matching';

export default {
  components: {
    Matching,
  },

  data() {
    return {
      step: 0,
    };
  },

}
</script>
