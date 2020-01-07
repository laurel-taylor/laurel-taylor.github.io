<template>
  <div v-if="show" class="clickme" @click="toggleShow">
    <i
      id="tooltipIcon"
      class="tooltip-icon glyphicon glyphicon-remove-circle"
    ></i>
    About the list
  </div>
  <div v-else @click="toggleShow">
    <ul>
      <li>
        <span class="own"
          >Songs that are highlighted are ones we have downloaded.</span
        >
        You can click the "only owned" checkbox to just show the songs we have.
      </li>
      <li>
        Songs that aren't highlighted are for purchase. Each song is $2 - the
        bartender can put it on your tab. Once it's downloaded it'll be there
        forever!
      </li>
      <!-- <li>You can add songs to your <span class="favorite">favorites list</span> by clicking them! Make sure you turn off the disable favorites checkbox to see them. That thing is there for noobs who are easily confused by too many colors.</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      show: false
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: disc;
}
</style>
