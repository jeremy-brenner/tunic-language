<template>
  <div id="ipaLookup">
    <input type="text" @keyup.enter="lookup" @keydown.stop v-model="word"><button @click="lookup">GO</button>
    <div class="output" v-for="result in results" :key="result.word">
      <span class="phoneme">
        {{ result.phoneme }} 
      </span>
      <span class="runes">
        <IPAToRunes :ipa="result.phoneme" />
      </span>
    </div>
  </div>
</template>
<script>

const dict = require('../dict.json');
import IPAToRunes from './IPAToRunes.vue';

export default {
  name: 'TextToIPA',
  components: {
    IPAToRunes
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
  #ipaLookup {
    display: grid;
    grid-template-columns: repeat(6,auto);
  }

  input {
    grid-column: span 5;
  }
  .output {
    border: 1px solid grey;
    grid-column: span 6;
  }
  .phoneme {
    padding-right: 1em;
  }

  .runes {
     display: inline-block;
  }
</style>