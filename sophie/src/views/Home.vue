<template>
  <div id="app">
    <div class="container">
      <div>
        <Template :color-group="colorGroup" :my-colors="myColors" />

        <color-schemes @choose="applyColors" />

        <textarea ref="invisible" v-model="invisible" class="invisible" />

        <div v-if="copyText" class="copyme-container">
          <textarea v-if="copyText" ref="copyMe" v-model="copyText" class="copyme" />
          <p><button v-if="copyText" @click="copyColors">Click to copy</button></p>
        </div>

        <div class="copyme-container">
          <button @click="getSharableLink">
            Share my colors
          </button>
          <p v-if="showCopiedText" class="small good">{{ showCopiedText }}</p>
        </div>
      </div>

      <div class="form">
        <div class="header">
          <h2>Sophie's Universe yarn calculator</h2>
          <router-link to="/about">About</router-link>
        </div>

        <div class="sizes">
          <div>Choose a size:</div>
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
          <p>
            <strong>Hooks:</strong> {{ size.hook1 }}, {{ size.hook2 }}
            <span class="small">(Switch to bigger hook size after row 24)</span>
          </p>
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
          <div>
            Colors:

            <template v-if="showSkeins">
              <input type="text" v-model="globalSkeinSize" class="global-skein" />
              <button @click="updateMySkeins">Apply size to all skeins</button>
            </template>
          </div>
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
                <input
                  type="color"
                  :value="myColors[i]"
                  @input="(payload) => updateColor(payload, i)"
                />
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
              <div class="small color-description" v-if="showSkeins">
                <div>Color name: <input v-model="myColorNames[i]" @input="editing = true" /></div>
              </div>
            </div>
        </div>
        <div class="controls">
          <button @click="showSkeins = !showSkeins">
            {{ showSkeins ? 'Hide' : 'Calculate' }} Skeins / {{ showSkeins ? 'Hide' : 'Show' }} Color names
          </button>
          <div v-if="showSkeins">
            <button @click="getColorList">Export colors per round</button>
            <button @click="getSkeinList">Export skein list</button>
          </div>
          <div v-if="admin">
            <button @click="exportColorScheme">export color scheme</button>
            <button @click="exportColorNames">export color names</button>
          </div>
        </div>
        <div v-if="editing">
          <div>
            <button @click="resetDefault">
            Reset default colors
            </button>
          </div>
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
    example: 'Scheepjes Colour Crafter or Softfun',
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
      copyText: '',
      invisible: '',
      showCopiedText: '',
      admin: false,
    };
  },

  mounted() {
    this.init();
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

    sharable() {
      const colors = this.myColors;
      const skeinSizes = this.mySkeinSize;
      const colorNames = this.myColorNames;
      const size = this.size.index;
      const colorGroup = this.colorGroup.index;

      return {
        colors, skeinSizes, colorNames, size, colorGroup,
      };
    },
  },

  methods: {
    init() {
      this.setColorNames();
      this.setFromParams();
    },

    setColorNames() {
      this.myColors.forEach((color, i) => {
        const colorName = this.getColorName(color) || '';
        this.$set(this.myColorNames, i, colorName);
      });
    },

    setFromParams() {
      const {
        colors, skeinSizes, colorNames, size, colorGroup, admin,
      } = this.$route.query;

      if (colors && skeinSizes && colorNames && size && colorGroup) {
        this.myColorNames = colorNames;
        this.myColors = colors;
        this.mySkeinSize = skeinSizes;
        const sizeKey = Object.keys(this.$options.sizes).find((key) => this.$options.sizes[key].index === size);
        this.size = this.$options.sizes[sizeKey];
        const colorGroupKey = Object.keys(this.$options.colorGroups).find((key) => this.$options.colorGroups[key].index === colorGroup);
        this.colorGroup = this.$options.colorGroups[colorGroupKey];

        this.editing = true;
      }

      if (admin) {
        this.admin = admin;
      }
    },

    updateColor(event, i) {
      this.editing = true;

      if (this.myColorNames[i] === this.getColorName(this.myColors[i])) {
        this.$set(this.myColorNames, i, '');
      }

      this.$set(this.myColors, i, event.target.value);
    },

    resetDefault() {
      this.myColors = [...this.colorGroup.defaultColors];
      this.setColorNames();
      this.editing = false;
      this.$router.replace({ name: this.$route.name, query: {} });
    },

    chooseSize(size) {
      this.size = size;
    },

    chooseColor(group) {
      this.colorGroup = { ...group };

      if (!this.editing) {
        this.myColors = [...group.defaultColors];
        this.setColorNames();
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
      this.setColorNames();
      this.editing = true;
    },

    moveUp(i) {
      if (i <= 0) return;
      const tempColor = this.myColors[i];
      const tempColorName = this.myColorNames[i];
      this.$set(this.myColors, i, this.myColors[i - 1]);
      this.$set(this.myColorNames, i, this.myColorNames[i - 1]);
      this.$set(this.myColors, i - 1, tempColor);
      this.$set(this.myColorNames, i - 1, tempColorName);
    },

    moveDown(i) {
      if (i + 1 >= this.colorGroup.colors.length) return;
      const tempColor = this.myColors[i];
      const tempColorName = this.myColorNames[i];
      this.$set(this.myColors, i, this.myColors[i + 1]);
      this.$set(this.myColorNames, i, this.myColorNames[i + 1]);
      this.$set(this.myColors, i + 1, tempColor);
      this.$set(this.myColorNames, i + 1, tempColorName);
    },

    getColorList() {
      let colorList = 'Sophie\'s Universe colors by row:\n\n';

      Object.keys(data.rows).forEach((key) => {
        const row = data.rows[key];
        const colorIndex = this.findColorIndex(row);

        colorList += `${row.name ? row.name : `Round ${row.index}`}: ${this.myColorNames[colorIndex]}\n`;
      });

      this.copyText = colorList;
    },

    replaceRoute() {
      this.$router.replace({ name: this.$route.name, query: this.sharable });
    },

    getSharableLink() {
      this.replaceRoute();
      this.copyUrl();
    },

    exportColorScheme() {
      let text = '[\n';

      this.myColors.forEach((color) => {
        text += `'${color}', \n`;
      });
      text += ']';
      this.copyText = text;
    },

    exportColorNames() {
      let text = '';

      this.myColorNames.forEach((name, i) => {
        text += `{ code: '${this.myColors[i]}', name: '${name}' },\n`;
      });
      this.copyText = text;
    },

    getSkeinList() {
      let skeinList = 'Yarns for Sophie\'s Universe:\n\n';

      this.mySkeins.forEach((skein, i) => {
        skeinList += `${this.myColorNames[i]}: ${skein.amount}\n`;
      });

      this.copyText = skeinList;
    },

    findColorIndex(round) {
      return data.findColorIndex(round, this.colorGroup);
    },

    async copyUrl() {
      this.invisible = window.location.href;
      await this.$nextTick();
      const elem = this.$refs.invisible;
      elem.select();
      elem.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand('copy');

      this.showCopiedText = 'Link copied to clipboard!';
      setTimeout(() => {
        this.showCopiedText = '';
      }, 3000);
    },

    copyColors() {
      const { copyMe } = this.$refs;

      /* Select the text field */
      copyMe.select();
      copyMe.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand('copy');

      this.showCopiedText = 'Text copied to clipboard!';
      setTimeout(() => {
        this.showCopiedText = '';
      }, 3000);
    },
  },
};
</script>

<style scoped>
.invisible {
  position: absolute;
  width: 10px;
  height: 10px;
}

.header {
  display: flex;
  align-items: baseline;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
  margin-right: 10px;
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
  display: flex;
  align-items: center;
}

.color-description {
  margin-left: 15px;
  margin-bottom: 5px;
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
  padding: 3px;
  font-size: 14px;
  opacity: 0;
  cursor: pointer;
  font-weight: bold;
}

.arrow:hover {
  opacity: 1;
}

.copyme-container {
  display: grid;
}

.copyme-container, .copyme-container * {
  z-index: 1001;
}

textarea.copyme {
  width: 100%;
  height: 80px;
}
</style>
