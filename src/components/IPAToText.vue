<template>
  <div class="output" v-for="result in results" :key="result"> {{  result }} </div>
</template>
<script>
import { getDict } from  '../lib/dict';
const runeDefs = require('../runeDefs.json');

export default {
  name: 'IPAToText',
  components: {
    
  },
  props: ['ipa'],
  data() {
    return {
      dict: []
    }
  },
  computed: {
    searchWords: function() {
      const searchWords = {
        [this.ipa]: true
      };
      runeDefs.alternates.forEach(([ak,av]) => {
        searchWords[this.ipa.replaceAll(ak,av)] = true;
      });
      return Object.keys(searchWords);
    },
    firstLetters: function() {
      return this.searchWords.map(w => w[0]).filter((value, index, self) => self.indexOf(value) === index );
    },
    results: function() {
      const matches = {} 
      this.dict
        .filter((entry) => entry.phoneme && this.searchWords.some(word => word == entry.phoneme))
        .forEach(({word}) => matches[word] = true );
      return Object.keys(matches);
    }
  },
  methods: {
    getDicts: function() {
      return Promise.all(this.firstLetters.map(l => this.getDict(l)))
        .then(dicts => {
          this.dict = dicts.flat().filter(d => d);
        })
    },
    getDict: function(l) {
      if(!l) {
        return;
      }
      return getDict('phoneme', l);
    }
  },
  mounted() {
    this.getDicts();
  },
  watch: {
    'ipa'() {
      this.getDicts();
    }
  }
}
</script>
<style scoped>

</style>