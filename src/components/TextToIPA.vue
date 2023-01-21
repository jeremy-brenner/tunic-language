<template>
  <div id="ipaLookup">
    <input type="search" @keyup="lookup" @search="lookup" @keydown.stop v-model="word">
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

import IPAToRunes from './IPAToRunes.vue';
import { getDict } from  '../lib/dict';

export default {
  name: 'TextToIPA',
  components: {
    IPAToRunes
  },
  methods: {
    lookup: function () {
      this.results = [];
      const l = this.word[0];
      if(!l) {
        return;
      }
      const reg = new RegExp(`^${this.word}(\\([1-9]\\))?$`);
      getDict('word', l)
        .then(dict => {
          this.results = dict.filter(({word}) => word.match(reg));
        });
    }
  },
  data() {
    return {
      word: "",
      results: [],
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
    grid-column: span 6;
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