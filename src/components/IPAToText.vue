<template>
  <div class="output" v-for="result in results" :key="result"> {{  result }} </div>
</template>
<script>
import { getDict } from  '../lib/dict';

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
    results: function() {
      const reg = new RegExp(`(\\([1-9]\\))?$`);
      const matches = {} 
      this.dict.filter(({phoneme}) => (phoneme || "").replace('ˈ','').replace('ˌ','') == this.ipa)
        .map(({word}) => word.replace(reg,''))
        .forEach(word => matches[word] = true );
      return Object.keys(matches);
    }
  },
  methods: {
    getDict: function(l) {
      if(!l) {
        return;
      }
      getDict('phoneme', l)
        .then(dict => this.dict=dict);
    }
  },
  mounted() {
    this.getDict(this.ipa[0]);
  },
  watch: {
    'ipa'(word) {
      this.getDict(word[0]);
    }
  }
}
</script>
<style scoped>

</style>