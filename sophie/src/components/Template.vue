<template>
  <div class="template">
      <div class="block">
        <div :title="`row: ${row.index}, color: ${row.color}`"
            :style="{ backgroundColor: row.color, display: +row.index > 90 ? 'none' : 'block'}"
            class="color-diagonal"
            v-for="(row, i) in rows"
            :key="i" />
      </div>
      <div class="block-border">
        <div :title="`row: ${row.index}, color: ${row.color}`"
            :style="{
                backgroundColor: 'transparent',
                display: +row.index >= 90 ? 'block' : 'none',
                borderBottom: `5px solid ${row.color}`,
                borderLeft: `5px solid ${row.color}`,
                width: `${+row.index * 5}px`,
                height: `${+row.index * 5}px`,
                left: `${(113 * 5) - (+row.index * 5)}px`,
                position: 'absolute',
            }"
            class="color-border"
            v-for="(row, i) in rows"
            :key="i" />
      </div>
      <div class="cover-block-bottom" />
  </div>
</template>

<script>
/* eslint-disable no-plusplus */
import data from '@/components/rowData';

export default {
  name: 'Template',
  allRows: data.rows,
  props: {
    colorGroup: {
      type: Object,
      default: () => ({}),
    },
    myColors: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    rows() {
      const colors = Object.keys(data.rows).map((key) => {
        const row = data.rows[key];
        const colorIndex = this.findColor(row);

        return {
          index: row.index,
          color: this.myColors[colorIndex],
        };
      });
      return colors;
    },
  },

  methods: {
    findColor(round) {
      const foundColor = -1;
      const { colors } = this.colorGroup;
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];

        for (let j = 0; j < color.length; j++) {
          const r1 = color[j];

          if (r1 === round) {
            return i;
          }
        }
      }

      console.log('could not find', round.index, 'in', this.colorGroup.title);
      return foundColor;
    },

    getStyle(row) {
      const styles = {
        backgroundColor: row.color,
      };

      //   styles.transform = 'rotate(135deg)';
      return styles;
    },
  },
};
</script>

<style scoped>
.template {
    position: relative;
}

.color-diagonal {
    width: 100%;
    height: 5px;
}

.block {
    position: absolute;
}

.block-border {
    height: 456px;
    transform: rotate(180deg);
    position: absolute;
    top: 109px;
}

.template, .cover-block-bottom, .block-border {
    width: 433px;
}

.cover-block-bottom {
    z-index: 1000;
    height: 456px;
}

.cover-block-bottom {
    background-color: #ffffff;
    position: relative;
    top: 456px;
}

.block {
    width: 500px;
    height: 456px;
    z-index: 0;
    top: 43px;
    right: 43px;
    transform: rotate(-135deg);
}
</style>
