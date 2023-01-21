<template>
   <WordView :words="[runeWord]" />
</template>
  <script>

  import WordView from './WordView.vue'
  const runeDefs = require('../runeDefs.json');
  const allPhones = [
    ...runeDefs.consonants.map(c => c.phoneme),
    ...runeDefs.vowels.map(c => c.phoneme)
  ].filter(p => p != '').sort((a,b) => b.length - a.length);


  const phoneReg = new RegExp('(' + allPhones.join('|') + ')', 'g');
  export default {
    name: 'IPAToRunes',
    components: {
      WordView
    },
    props: ['ipa'],
    computed: {
     runeWord: function() {
        const word = [];
        const match = this.ipa.replace("ˈ","").match(phoneReg);
        const defs = match.map( m => this.getCharDef(m));
        defs.forEach( (def) => {
          if(word.length == 0) {
            word[0] = [
              def.typeIndex == 0 ? def.num : 0,
              def.typeIndex == 1 ? def.num : 0,
              0
            ];
            return;
          }
          const lastIndex = word.length-1
          if(def.typeIndex == 1 && word[lastIndex][1] == 0 ) {
            word[lastIndex][1] = def.num;
            return;
          }

          if(def.typeIndex == 0 && word[lastIndex][0] == 0 ) {
            word[lastIndex][0] = def.num;
            word[lastIndex][2] = 1;
            return;
          }

          word[lastIndex+1] = [
            def.typeIndex == 0 ? def.num : 0,
            def.typeIndex == 1 ? def.num : 0,
            0
          ];
        });
        return word;
     }
    },
    methods: {
      getCharDef: function(c) {
        const cI = runeDefs.consonants.findIndex(def => def.phoneme == c);
        if(cI > -1) {
          return {
            num: cI,
            typeIndex: 0
          }
        }
        const vI = runeDefs.vowels.findIndex(def => def.phoneme == c);
        if(vI > -1) {
          return {
            num: vI,
            typeIndex: 1
          }
        }
      }
    }
  }
  </script>
  <style scoped>
  
  </style>