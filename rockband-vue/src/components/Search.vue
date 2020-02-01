<template>
  <div class="search-container">
    <div class="search-bar">
      <i
        @click="toggleInfo"
        :class="[
          'info-icon glyphicon',
          { 'glyphicon-info-sign': !showInfo },
          { 'glyphicon-remove-circle': showInfo }
        ]"
      />

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
      />
    </div>
    <div class="spacer" />

    <div class="info-container">
      <div class="info" v-if="showInfo" @click="showInfo = false">
        About the list

        <ul>
          <li>
            <span class="own">
              Songs that are highlighted are ones we have downloaded.
            </span>
            <!-- You can click the "only owned" checkbox to just show the songs we have. -->
          </li>
          <li>
            Songs that aren't highlighted are for purchase. Each song is $2 -
            the bartender can put it on your tab. Once it's downloaded it'll be
            there forever!
          </li>
          <!-- <li>You can add songs to your <span class="favorite">favorites list</span> by clicking them! Make sure you turn off the disable favorites checkbox to see them. That thing is there for noobs who are easily confused by too many colors.</li> -->
        </ul>

        About Rock Band Mondays
        <ul>
          <li>
            Sign up with your song and a fake band name. Or your name, if you
            want to be boring.
            <strong>If you change your band name let the KJ know.</strong> Song
            choice usually follows the singer, but not always.
          </li>

          <li>
            When you grab an instrument do NOT press any buttons until you need
            to pick your difficulty; we'll scroll to your song for you!
          </li>

          <li>
            We play on "No fail" mode, so if you suck at Rock Band, that is
            okay.
          </li>

          <li>
            If you don't have 4 players in your band that's fine, we take
            volunteers from the audience. Just come on up and grab a plastic
            instrument when volunteers are called for. But don't be a drum hog;
            let other people have a chance to play.
          </li>

          <li>
            Please use the stairs to come up to the stage. You are not actually
            a rock star (and we don't want you to get hurt).
          </li>

          <li>
            <strong>Please be gentle with the controllers.</strong> The
            instruments aren't made anymore, and replacing them runs from
            expensive to impossible. That said, if you are too drunk to play, we
            will ask you nicely to step off the stage.
          </li>

          <li>
            Please do NOT tap the microphone, even if the game is telling you
            to. The mic doesn't run through the game, it goes through the PA
            system, and it doesn't like being hit.
          </li>
        </ul>
      </div>
    </div>
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
      isFocus: false,
      showInfo: false
    };
  },
  computed: {
    hasSearch() {
      return this.search || this.isFocus;
    }
  },
  methods: {
    toggleInfo() {
      if (this.showInfo) {
        this.showInfo = false;
      } else {
        this.showInfo = true;
        window.scrollTo(0, 0);
      }
    },
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
  top: 0;
  width: 100%;
  background-color: #fff;
}

.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  border-bottom: 1px solid #e4e4e4;
  height: 50px;
  background-color: #fff;
  z-index: 2;
}

.info-container {
  position: relative;
  top: 88px;
  margin-right: 1rem;
  margin-left: 1rem;
  padding-bottom: 50px;
}

.info {
  padding-top: 1rem;
}

.search-bar .info-icon {
  padding: 1rem;
  cursor: pointer;
}

.search {
  /* margin: 5px; */
  width: 100%;
  padding: 5px;
  border: 0;
}

.search:focus + .clear,
.search.has-text + .clear {
  opacity: 1;
}

.clear {
  transition: all 0.2s ease-in-out;
  opacity: 0;
  cursor: pointer;
  color: #999999;
  justify-self: flex-end;
  padding: 1rem;
}

.info {
  font-size: 1.5rem;
  cursor: pointer;
}

i {
  color: #999999;
}

ul {
  list-style-type: circle;
  padding: 0;
  margin: 1rem 2rem;
}

li {
  margin-top: 0.5rem;
}
</style>
