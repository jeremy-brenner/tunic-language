<template>
  <input type="text" @keyup.enter="lookup"  v-model="word"><button @click="lookup">GO</button>
  <div class="output" v-for="result in results" :key="result.word"> {{  result.phoneme }} </div>
</template>
<script>

export default {
  name: 'TextToIPA',
  components: {
    
  },
  methods: {
    lookup: function () {
      const reg = new RegExp(`^${this.word}(\\([1-9]\\))?$`);
      this.results = this.dict.filter(({word}) => word.match(reg));
    },
  },
  data() {
    return {
      dict: [],
      word: "",
      results: []
    }
  },
  mounted() {
    fetch('./ipadict.txt')
      .then((result) => result.text())
      .then((data) => data.split("\n") )
      .then((lines) => lines
        .map( line => line.split(/\s+/))
        .map( ([word,phoneme]) => ({word,phoneme}) )
      )
      .then((parsed) => this.dict = parsed);
  }
}
</script>
<style scoped>
  .output {
    margin-left: 10px;
    border: 1px solid grey;
    width: 100px;
  }
</style>