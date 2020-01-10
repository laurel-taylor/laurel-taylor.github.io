<template>
  <div>
    <table v-if="filteredList.length">
      <thead>
        <tr>
          <td>Artist</td>
          <td>Song</td>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, i) in filteredList"
          :key="i"
          :class="[{ own: item[2] === 'y' }]"
        >
          <td class="band">{{ item[0] }}</td>
          <td class="song">{{ item[1] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="empty" v-else>
      No results...
      <a href="#" @click.prevent="searchAgain">search again</a>
    </div>
  </div>
</template>

<script>
import { buildSongList } from "@/list";

export default {
  name: "Search",
  props: {
    search: String
  },
  data() {
    return {
      list: buildSongList()
    };
  },
  computed: {
    filteredList() {
      if (this.search) {
        const search = this.search.toLowerCase();
        return this.list.filter(item => {
          return (
            item[0].toLowerCase().indexOf(search) >= 0 ||
            item[1].toLowerCase().indexOf(search) >= 0
          );
        });
      }
      return this.list;
    }
  },
  methods: {
    searchAgain() {
      this.$emit("searchAgain");
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

thead td {
  font-size: 2rem;
  font-weight: 500;
}

td {
  padding: 6px 10px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}

td:first-child {
  width: 50%;
  border-left: 1px solid #e4e4e4;
}

td:last-child {
  border-right: 1px solid #e4e4e4;
}

.empty {
  padding: 1rem;
  font-style: italic;
}
</style>
