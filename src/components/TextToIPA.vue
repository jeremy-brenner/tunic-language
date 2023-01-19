<template>
  <input type="text" @keyup.enter="lookup"  v-model="word"><button @click="lookup">GO</button>
  <div class="output" v-for="result in results" :key="result.word"> {{  result.phoneme }} </div>
</template>
<script>

const dict = require('../dict.json');

export default {
  name: 'TextToIPA',
  components: {
    
  },
  methods: {
    lookup: function () {
      const reg = new RegExp(`^${this.word}(\\([1-9]\\))?$`);
      this.results = dict.filter(({word}) => word.match(reg));
    },
  },
  data() {
    return {
      word: "",
      results: []
    }
  },
}
</script>
<style scoped>
  .output {
    margin-left: 10px;
    border: 1px solid grey;
    width: 100px;
  }
</style>