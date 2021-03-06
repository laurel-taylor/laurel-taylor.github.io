<template>
  <div>
    <div class="table" v-if="filteredList.length">
      <div class="thead">
        <div class="td" @click="setSort(0)">
          Artist
          <i
            v-if="sortProp === 0"
            :class="[
              'glyphicon',
              { 'glyphicon-menu-down': ascending },
              { 'glyphicon-menu-up': !ascending }
            ]"
          />
        </div>
        <div class="td" @click="setSort(1)">
          Song
          <i
            v-if="sortProp === 1"
            :class="[
              'glyphicon',
              { 'glyphicon-menu-down': ascending },
              { 'glyphicon-menu-up': !ascending }
            ]"
          />
        </div>
      </div>
      <div class="tbody">
        <div
          class="tr"
          v-for="(item, i) in filteredList"
          :key="i"
          :class="[{ own: item[2] === 'y' }]"
        >
          <div class="td band">{{ item[0] }}</div>
          <div class="td song">{{ item[1] }}</div>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      No results...
      <a href="#" @click.prevent="searchAgain">search again</a>
    </div>
  </div>
</template>

<script>
import { buildSongList } from "@/list";

export default {
  name: "List",

  props: {
    search: String
  },

  data() {
    return {
      list: buildSongList(),
      ascending: true,
      sortProp: 0
    };
  },

  mounted() {
    this.sortList();
  },

  computed: {
    filteredList() {
      const list = this.list;

      if (this.search) {
        const search = this.search.toLowerCase();
        return list.filter(item => {
          return (
            item[0].toLowerCase().indexOf(search) >= 0 ||
            item[1].toLowerCase().indexOf(search) >= 0
          );
        });
      }
      return list;
    }
  },
  methods: {
    sortList() {
      const sortFunction = (a, b) => {
        const property = this.sortProp;
        const sortOrder = this.ascending ? 1 : -1;

        let result =
          a[property].toLowerCase() < b[property].toLowerCase()
            ? -1
            : a[property].toLowerCase() > b[property].toLowerCase()
            ? 1
            : 0;

        if (result === 0 && property === 0) {
          result =
            a[1].toLowerCase() < b[1].toLowerCase()
              ? -1
              : a[1].toLowerCase() > b[1].toLowerCase()
              ? 1
              : 0;
        }

        return result * sortOrder;
      };
      this.list = this.list.sort(sortFunction);

      window.scrollTo(0, 0);
    },

    setSort(property) {
      if (this.sortProp === property) {
        this.ascending = !this.ascending;
      } else {
        this.sortProp = property;
        this.ascending = true;
      }
      this.sortList();
    },

    searchAgain() {
      this.$emit("searchAgain");
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
}

.tr,
.thead {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #e4e4e4;
}

.thead i {
  font-size: 1rem;
}

.thead {
  position: fixed;
  top: 50px;
  z-index: 1;
  background-color: white;
  width: 100%;
}

.thead .td {
  cursor: pointer;
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tbody {
  position: relative;
  top: 42px;
}

.td {
  padding: 6px 10px;
}

.empty {
  padding: 1rem;
  font-style: italic;
}
</style>
