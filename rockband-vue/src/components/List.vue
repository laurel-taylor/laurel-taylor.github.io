<template>
  <div>
    <table>
      <thead>
        <td>Artist</td>
        <td>Song</td>
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
      return this.list;
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

thead {
  font-size: 1.25rem;
  font-weight: 500;
}

td {
  border: 1px solid #e4e4e4;
  padding: 6px 10px;
}
</style>
