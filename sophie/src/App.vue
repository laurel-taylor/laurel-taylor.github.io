<template>
  <div id="app">
    <div class="container">

      <div>
        <Template :color-group="colorGroup" :my-colors="myColors" />

        <color-schemes @choose="applyColors" />
      </div>

      <div class="form">
        <h2>Sophie's Universe yarn calculator</h2>

        <div class="sizes">
          <div>Choose a size</div>
          <div class="button-group">
            <button
              v-for="(size, i) in Object.keys($options.sizes)"
              :key="i"
              :class="{ selected: isSizeSelected($options.sizes[size].title) }"
              @click="chooseSize($options.sizes[size])">
              {{ $options.sizes[size].title }}
            </button>
          </div>
          <p><strong>Yarn:</strong> {{ size.yarn }} - {{ size.example }}</p>
          <p>
            <strong>Finished size:</strong> {{ size.finished }}
          </p>
          <p><strong>Hooks:</strong> {{ size.hook1 }}, {{ size.hook2 }}</p>
          <p class="small">(Switch to bigger hook size after row 24)</p>
        </div>

        <div class="color-group">
          <div>Choose a color pattern:</div>
          <div class="button-group">
            <button
              v-for="(color, i) in Object.keys($options.colorGroups)"
              :key="i"
              :class="{ selected: isColorSelected($options.colorGroups[color].title) }"
              @click="chooseColor($options.colorGroups[color])">
              {{ $options.colorGroups[color].title }}
            </button>
          </div>
        </div>

        <div class="color-group">
          <div>Colors:</div>
            <div
              v-for="(color, i) in colorGroup.colors"
              :key="i"
            >
              <div class="color-title">
                <div class="color-number">
                  <span class="arrows">
                    <span class="up arrow" @click="moveUp(i)">^</span>
                    <span class="down arrow" @click="moveDown(i)">v</span>
                  </span>
                  <span>Color {{ i+1 }}:</span>
                </div>
                <input type="color" v-model="myColors[i]" @input="editing = true" />
                <div class="color-amount">
                  Amount: {{ mySkeins[i].yardage }}m
                </div>
                <div class="color-skeins" v-if="showSkeins">
                  / <input type="text" class="yardage" v-model="mySkeinSize[i]" />m
                  = <strong>{{ mySkeins[i].amount }}</strong>
                  <span :class="['small',
                    { good: mySkeins[i].good },
                    { caution: mySkeins[i].caution}]"
                  >
                    (Left over: {{ mySkeins[i].leftOver }}m)
                  </span>
                </div>
              </div>
              <div class="small color-description">{{ getColorName(myColors[i]) }}</div>
            </div>
        </div>
        <div>
          <button @click="showSkeins = !showSkeins">
            {{ showSkeins ? 'Hide' : 'Calculate' }} Skeins
          </button>
          <template v-if="showSkeins">
            <input type="text" v-model="globalSkeinSize" class="global-skein" />
            <button @click="updateMySkeins">Apply size to all skeins</button>
          </template>
        </div>
        <div v-if="editing">
          <button @click="resetDefault">
          Reset default colors
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/components/rowData';
import Template from '@/components/Template.vue';
import ColorSchemes from '@/components/ColorSchemes.vue';

const sizes = {
  small: {
    title: 'Small',
    index: 'small',
    yarn: '4ply (#2)',
    example: 'Scheepjes Color 8',
    finished: '1m x 1m',
    hook1: '2.5/2.75mm',
    hook2: '3.0/3.25mm',
  },
  medium: {
    title: 'Medium',
    index: 'medium',
    yarn: 'DK (#3)',
    example: 'Scheepjes Color Crafter or Softfun',
    finished: '1.4m x 1.4m',
    hook1: '3.5mm',
    hook2: '4mm',
  },
  large: {
    title: 'Large',
    index: 'large',
    yarn: 'Worsted (#4)',
    example: 'Scheepjes Softfun XL or Stonewashed XL',
    finished: '1.8m x 1.8m',
    hook1: '5mm',
    hook2: '5.5mm',
  },
};

export default {
  name: 'App',

  components: {
    Template,
    ColorSchemes,
  },

  sizes,
  colorGroups: data.colorGroups,

  data() {
    const skeinSize = data.colorGroups.medium_softfun.defaultColors.map(() => 200);

    return {
      rows: data.rows,
      size: sizes.medium,
      editing: false,
      showSkeins: false,
      colorGroup: { ...data.colorGroups.medium_softfun },
      myColors: [...data.colorGroups.medium_softfun.defaultColors],
      myColorNames: [],
      mySkeinSize: skeinSize,
      globalSkeinSize: skeinSize[0],
    };
  },

  computed: {
    mySkeins() {
      return this.colorGroup.colors.map((rows, i) => {
        const yardage = this.getYardage(rows);
        const skeinSize = this.mySkeinSize[i];
        const totalSkeins = yardage / skeinSize;
        const leftOver = Math.floor((Math.floor(totalSkeins) + 1 - totalSkeins) * skeinSize) || 0;
        return {
          yardage,
          amount: Math.ceil(totalSkeins),
          leftOver,
          good: leftOver > 50,
          caution: leftOver < 20,
        };
      });
    },
  },

  methods: {
    resetDefault() {
      this.myColors = [...this.colorGroup.defaultColors];
      this.editing = false;
    },

    chooseSize(size) {
      this.size = size;
    },

    chooseColor(group) {
      this.colorGroup = { ...group };

      if (!this.editing) {
        this.myColors = [...group.defaultColors];
      }
    },

    isSizeSelected(title) {
      return this.size.title === title;
    },

    isColorSelected(title) {
      return this.colorGroup.title === title;
    },

    getYardage(rows) {
      const result = rows && rows.reduce((accumulator, row) => {
        const rowTotal = row[this.size.index];

        return rowTotal + accumulator;
      }, 0);

      return result;
    },

    getColorName(colorCode) {
      const found = data.colorMap.find(({ code }) => colorCode === code);

      return found ? found.name : '';
    },

    updateMySkeins() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.mySkeins.length; i++) {
        this.$set(this.mySkeinSize, i, this.globalSkeinSize);
      }
    },

    applyColors(colors) {
      this.myColors = [...colors];
      this.editing = true;
    },

    moveUp(i) {
      if (i <= 0) return;
      const tempColor = this.myColors[i];
      const lastColor = this.myColors[i - 1];
      this.$set(this.myColors, i, lastColor);
      this.$set(this.myColors, i - 1, tempColor);
    },

    moveDown(i) {
      if (i + 1 >= this.colorGroup.colors.length) return;
      const tempColor = this.myColors[i];
      const lastColor = this.myColors[i + 1];
      this.$set(this.myColors, i, lastColor);
      this.$set(this.myColors, i + 1, tempColor);
    },
  },

};
</script>

<style>
body * {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.form {
  z-index: 1000;
  padding-left: 20px;
  background-color: #ffffff;
}

.container {
  display: flex;
}

.button-group {
  display: flex;
  margin-bottom: 10px;
}

button.selected {
  color: blue;
}

.color-number {
  width: 110px;
  height: 35px;
  display: flex;
  align-items: center;
}

.color-amount {
  margin-left: 10px;
}

.color-title {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.color-description {
  margin-left: 15px;
}

.small {
  font-size: 11px;
}

.sizes p {
  margin-top: 0;
  margin-bottom: 3px;
}

input.yardage, input.global-skein {
  width: 35px;
}

.global-skein {
  margin-left: 10px;
}

.good {
  color: green;
}

.caution {
  color: darkred;
}

.arrows {
  position: relative;
}

.arrow {
  transition: all 0.2s ease;
  display: block;
  width: 15px;
  height: 15px;
  padding: 2px;
  font-size: 14px;
  opacity: 0;
  cursor: pointer;
}

.arrow:hover {
  opacity: 1;
}
</style>
