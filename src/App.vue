<template>
  <div class="centerLineToggle" @click="toggleCenterLine">
    Center Line: {{ centerLine ? "YES" : "NO" }}
  </div>
  <div class="charGrid">
    <div class="head">- Outer -</div>
    <span 
      @mouseover="mouseOver(word.chars[0])"
      @mouseout="mouseOut()"
 
      v-for="word in outerChars" :key="word.eng"
    >
      <span class="eng">
        {{word.eng}}:
      </span> 
      <TunicChar :char="word.chars[0]" :centerLine="centerLine"  :highlite="highlite"/>
    </span>
  </div>
  <div class="charGrid">
    <div class="head">- Inner -</div>
    <span 
      @mouseover="mouseOver(word.chars[0])"
      @mouseout="mouseOut()"
 
      v-for="word in innerChars" :key="word.eng"
    >
      <span class="eng">
        {{word.eng}}:
      </span> 
      <TunicChar :char="word.chars[0]" :centerLine="centerLine"  :highlite="highlite"/>
    </span>
  </div>
  <div class="wordGrid">
    <div class="head">- Words -</div>
    <span v-for="word in words" :key="word.eng">
      {{ word.eng }}: 
      <TunicChar 
        :char="char" 
        :highlite="highlite" 
        @mouseover="mouseOver(char)"
        @mouseout="mouseOut()"
        :centerLine="centerLine" 
        v-for="char in word.chars" :key="char" 
      />
    </span>
  </div>
</template>

<script>
import TunicChar from './components/TunicChar.vue'
const words = require('./words.json');

export default {
  name: 'App',
  components: {
    TunicChar
  },
  methods: {
    mouseOver: function (char) {
      this.highlite = char;
    },
    mouseOut: function() {
      this.highlite = [0,0];
    },
    toggleCenterLine: function () {
      this.centerLine = !this.centerLine;
    }
  },
  data() {
    return {
      centerLine: true,
      highlite: [0,0],
      outerChars: [...Array(18).keys()].map(n => ({
        eng: n+1,
        chars: [[0,n+1]]
      })),
      innerChars: [...Array(24).keys()].map(n =>  ({
        eng: n+1,
        chars: [[n+1,0]]
      })),
      words: words
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 10px;
  font-size: 18px;
}

.centerLineToggle {
  cursor: pointer;
}

.eng {
  margin-right: 0.25em;
}

.charGrid .head {
  text-align: center;
  grid-column: span 6;
}

.charGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  font-size: 24px;
}

.wordGrid .head {
  text-align: center;
  grid-column: span 3;
}

.wordGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 24px;
}

.wordGrid span {
    white-space: nowrap;
}

</style>
