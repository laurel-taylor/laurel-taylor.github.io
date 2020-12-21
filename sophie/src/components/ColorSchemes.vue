<template>
  <div class="scheme-container">
    <p>Example color pallets:</p>
    <div class="schemes">
      <div
          v-for="(scheme, i) in $options.schemes"
          :key="i"
          @click="$emit('choose', scheme.colors)"
          class="scheme"
      >
          <div v-for="(color, j) in scheme.colors"
              :key="j"
              :style="{ backgroundColor: color }"
              class="color"
          />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'color-schemes',

  schemes: [
    {
      name: 'flickr',
      colors: [
        '#F72585',
        '#B5179E',
        '#7209B7',
        '#560BAD',
        '#480CA8',
        '#3A0CA3',
        '#3F37C9',
        '#4361EE',
        '#4895EF',
        '#4CC9F0',
        '#4CC9F0',
      ],
    },
    {
      name: 'fire',
      colors: [
        '#03071E',
        '#370617',
        '#6A040F',
        '#9D0208',
        '#D00000',
        '#DC2F02',
        '#E85D04',
        '#F48C06',
        '#FAA307',
        '#FFBA08',
        '#FFBA08',
      ],
    },
    {
      name: 'library',
      colors: [
        '#e76f51',
        '#f4a261',
        '#e9c46a',
        '#2a9d8f',
        '#264653', //
        '#2a9d8f',
        '#e9c46a',
        '#f4a261',
        '#e76f51',
        '#2a9d8f',
        '#264653',
      ],
    },
  ],
};
</script>

<style scoped>
.schemes {
    display: flex;
}

.scheme-container, .scheme-container > p {
  display: grid;
  z-index: 1001;
}

.scheme {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    z-index: 1001;
    height: 50px;
    display: flex;
    margin: 5px;
    border: 1px solid transparent;
}

.scheme:hover {
    border: 1px solid blue;
}

.color {
    height: 100%;
    width: 10px;
}
</style>
