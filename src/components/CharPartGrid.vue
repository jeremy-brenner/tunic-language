<template>
  <div class="charGrid">
    <div class="head">- {{ title }} -</div>
    <span
      @click="click(i)"
      @mouseover="mouseOver(wordChars[i])"
      @mouseout="mouseOut()"
      v-for="(char,i) in chars" :key="i"
    >
      <span class="phoneme" :class="{ missing: !char.phoneme }">
        {{ char.phoneme || i }}
      </span>
      <TunicChar :char="wordChars[i]" :centerLine="centerLine" :highlite="highlite"/>
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
    props: ['title','charType', 'highlite', 'centerLine'],
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

  .charGrid .head {
    text-align: center;
    grid-column: span 6;
  }

  .charGrid {
    margin-top: 20px;
    display: grid;
  }

  .charGrid > span {
    padding-left: 0.5em;
    line-height: 1.5em;
    border: 1px solid gray;
  }

  .phoneme {
    display: inline-block;
    width: 1.25em;
    padding-right: 0.5em;
  }
  .missing {
    color: #ff0000;
  }

</style>