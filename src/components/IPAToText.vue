<template>
  <div class="output" v-for="result in results" :key="result"> {{  result }} </div>
</template>
<script>
const dict = require('../dict.json');

export default {
  name: 'IPAToText',
  components: {
    
  },
  props: ['ipa'],
  computed: {
    results: function() {
      const reg = new RegExp(`(\\([1-9]\\))?$`);

      const matches = {} 
      dict
        .filter(({phoneme}) => (phoneme || "").replace('ˈ','') == this.ipa)
        .map(({word}) => word.replace(reg,''))
        .forEach(word => matches[word] = true );
      return Object.keys(matches);
    }
  },
}
</script>
<style scoped>

</style>