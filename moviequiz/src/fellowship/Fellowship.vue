<template>
  <div class="about">
    <matching
      v-if="section===0"
      @next="section++"
      @back="section--"
    />

    <accessories
      v-if="section===1"
      @next="section++"
      @back="section--"
      show-back
    />

    <plot
      v-if="section===2"
      @next="section++"
      @back="section--"
      show-back
    />

    <div v-if="section>sections">
      Nothing here yet!
      <button @click="section--">Go back</button>
    </div>

  </div>
</template>

<script>
import Matching from '@/fellowship/Matching';
import Accessories from '@/fellowship/Accessories';
import Plot from '@/fellowship/Plot';

export default {
  components: {
    Matching,
    Accessories,
    Plot,
  },

  data() {
    return {
      section: 0,
      sections: 2,
    };
  },

}
</script>
