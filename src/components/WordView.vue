<template>
  <div class="wordview">
    <span class="wordSpan" v-for="(word,wordNum) in words" :key="word" >
      <div class="tunic">
        <TunicRune 
          :rune="rune" 
          :highlite="highlite" 
          @mouseover="mouseOver(rune)"
          @mouseout="mouseOut()"
          @click="click(wordNum,runeNum)"
          :centerLine="centerLine" 
          :class="{
            current: isCurrent(wordNum,runeNum)
          }"
          v-for="(rune,runeNum) in word" :key="rune" 
        />
      </div>
      <div class="phonic" v-if="showPhonics">
        {{ phonicWord(word) }}
      </div>
      <div class="text" v-if="showEnglish">
        <IPAToText :ipa="phonicWord(word)" />
      </div>
    </span>
  </div> 
</template>
<script>
const runeDefs = require('../runeDefs.json');

import TunicRune from './TunicRune.vue'
import IPAToText from './IPAToText.vue'

export default {
  name: 'WordView',
  components: {
    TunicRune, IPAToText
  },
  props: ['words', 'highlite', 'centerLine', 'position', 'showPhonics', 'showEnglish'],
  emits: ['highliteRune', 'selectRune'],
  methods: {
    phonicWord: function(word) {
      return word.map( rune => {
        const consonant = runeDefs.consonants[rune[0]]?.phoneme || "";
        const vowel = runeDefs.vowels[rune[1]]?.phoneme || "";
        return rune[2] == 1 ? `${vowel}${consonant}` : `${consonant}${vowel}`;
      }).join('');
    },
    isCurrent: function(wordNum,runeNum) {
      if(!this.position) {
        return false;
      }
      return this.position.word == wordNum && this.position.rune == runeNum
    },
    mouseOver: function (rune) {
      this.$emit('highliteRune', rune);
    },
    mouseOut: function() {
      this.$emit('highliteRune', [0,0,0]);
    },
    click: function(wordNum, runeNum) {
      this.$emit('selectRune', wordNum, runeNum);
    }
  },
  data() {
    return {

    }
  },
}
</script>
<style scoped>

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