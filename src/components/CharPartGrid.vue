<template>
  <div class="charGrid">
    <span
      @click="click(i)"
      @mouseover="mouseOver(wordChars[i])"
      @mouseout="mouseOut()"
      v-for="(char,i) in chars" :key="i"
    >
      <TunicChar :char="wordChars[i]" :centerLine="centerLine" :highlite="highlite"/>
      <span class="phoneme">
        {{ char.phoneme }}
      </span>
    </span>
  </div>
</template>
<script>
  import TunicChar from './TunicChar.vue'
  const charDefs = require('../charDefs.json');

  export default {
    name: 'CharPartGrid',
    components: { 
      TunicChar
    },
    data: function() {
      return {
        chars: charDefs[this.charType],
      }
    },
    props: ['charType', 'highlite', 'centerLine'],
    emits: ['pickCharPart', 'highliteChar'],
    computed: {
      typeIndex: function() {
        switch (this.charType) {
          case 'consonants':
            return 0;
          case 'vowels':
            return 1;
          case 'swap':
            return 2;
        }
        return ""
      },
      wordChars: function() {
        const wChars = {};
        charDefs[this.charType].forEach( (_,i) => {
          wChars[i] = [
            this.charType == 'consonants' ? i : 0,
            this.charType == 'vowels' ? i : 0,
            this.charType == 'swap' ? i : 0,
          ]
        });
        return wChars;
      }
    },
    methods: {
      click: function (value) {
        this.$emit('pickCharPart', {
          typeIndex: this.typeIndex,
          value
        });
      },
      mouseOver: function (char) {
        this.$emit('highliteChar', char)
      },
      mouseOut: function() {
        this.$emit('highliteChar', [0,0,0])
      },
    }

  }
</script>
<style scoped>

  .charGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(3.5em,auto));
    border-top: 1px solid gray;
    border-left: 1px solid gray;
  }

  .charGrid > span {
    padding-left: 0.5em;
    line-height: 1.5em;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;

  }

  .phoneme {
    display: inline-block;
    width: 1.25em;
    padding-left: 0.5em;
  }

</style>