<template>
  <div class="wordview">
    <span class="wordSpan" v-for="(word,wordNum) in words" :key="word" >
      <div class="tunic">
        <SVGRune 
          :rune="rune" 
          :highlite="highlite" 
          @mouseover="mouseOver(rune)"
          @mouseout="mouseOut()"
          @click="click(wordNum,runeNum)"
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

import SVGRune from './SVGRune.vue'
import IPAToText from './IPAToText.vue'

export default {
  name: 'WordView',
  components: {
    SVGRune, IPAToText
  },
  props: ['words', 'highlite', 'position', 'showPhonics', 'showEnglish'],
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
  margin-right: 0.5em;
  vertical-align: top;
}

.current {
  color: blue;
}

.wordSpan {
  display: inline-block;
}

.tunic {
  filter: drop-shadow(0.05em 0.05em 0.05em rgb(0 0 0 / 0.5));
}
.tunic, .phonic, .text {
  display: block;
}
</style>