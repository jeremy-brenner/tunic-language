<template>
  <div class="wordview">
    <span class="wordSpan" v-for="(word,wordNum) in words" :key="word" >
      <div class="tunic">
        <TunicChar 
          :char="char" 
          :highlite="highlite" 
          @mouseover="mouseOver(char)"
          @mouseout="mouseOut()"
          @click="click(wordNum,charNum)"
          :centerLine="centerLine" 
          :class="{
            current: isCurrent(wordNum,charNum)
          }"
          v-for="(char,charNum) in word" :key="char" 
        />
      </div>
      <div class="phonic">
        {{ phonicWord(word) }}
      </div>
      <div class="text">
        <IPAToText :ipa="phonicWord(word)" />
      </div>
    </span>
  </div> 
</template>
<script>
const charDefs = require('../charDefs.json');

import TunicChar from './TunicChar.vue'
import IPAToText from './IPAToText.vue'

export default {
  name: 'WordView',
  components: {
    TunicChar, IPAToText
  },
  props: ['words', 'highlite', 'centerLine', 'position'],
  emits: ['highliteChar', 'selectChar'],
  methods: {
    phonicWord: function(word) {
      return word.map( char => {
        const consonant = charDefs.consonants[char[0]]?.phoneme || "";
        const vowel = charDefs.vowels[char[1]]?.phoneme || "";
        return char[2] == 1 ? `${vowel}${consonant}` : `${consonant}${vowel}`;
      }).join('');
    },
    isCurrent: function(wordNum,charNum) {
      if(!this.position) {
        return false;
      }
      return this.position.word == wordNum && this.position.char == charNum
    },
    mouseOver: function (char) {
      this.$emit('highliteChar', char);
    },
    mouseOut: function() {
      this.$emit('highliteChar', [0,0,0]);
    },
    click: function(wordNum, charNum) {
      this.$emit('selectChar', wordNum, charNum);
    }
  },
  data() {
    return {

    }
  },
}
</script>
<style scoped>

.wordview {
  margin-top: 20px;
}

.wordview .head {
  text-align: center;
  font-size: 22px;
}

.wordSpan {
  margin-right: 0.25em;
  vertical-align: top;
}

.current {
  color: blue;
}

.wordSpan {
  display: inline-block;
}

.tunic, .phonic, .text {
  display: block;
}
</style>