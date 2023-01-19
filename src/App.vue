<template>
  <TextToIPA/>
  <div class="centerLineToggle" @click="toggleCenterLine">
    Center Line: {{ centerLine ? "YES" : "NO" }}
  </div>
  <div class="charGrid">
    <div class="head">- Consonants -</div>
    <span 
      @mouseover="mouseOver(word.chars[0])"
      @mouseout="mouseOut()"
 
      v-for="word in innerChars" :key="word.eng"
    >

      {{word.eng}}
      (<span class="phoneme">
        {{ consonants[word.eng] }}
      </span>):
      <TunicChar :char="word.chars[0]" :centerLine="centerLine"  :highlite="highlite"/>
    </span>
  </div>
  <div class="charGrid">
    <div class="head">- Vowels -</div>
    <span 
      @mouseover="mouseOver(word.chars[0])"
      @mouseout="mouseOut()"
 
      v-for="word in outerChars" :key="word.eng"
    >
      {{word.eng}}
      (<span class="phoneme">
        {{ vowels[word.eng] }}
      </span>):
      <TunicChar :char="word.chars[0]" :centerLine="centerLine"  :highlite="highlite"/>
    </span>
  </div>
  <div class="wordGrid">
    <div class="head">- Words -</div>
    <span v-for="phrase in words" :key="phrase.eng">
      <div>
        {{ phrase.eng }}
      </div>
      <div>
        <span class="wordSpan" v-for="word in phrase.words" :key="word" >
          <TunicChar 
            :char="char" 
            :highlite="highlite" 
            @mouseover="mouseOver(char)"
            @mouseout="mouseOut()"
            :centerLine="centerLine" 
            v-for="char in word" :key="char" 
          />
        </span>
      </div>
      <div>
        <span class="wordSpan" v-for="word in phrase.words" :key="word" >
          {{  getIPA(word) }}
        </span>
      </div>
    </span>
  </div>
</template>

<script>
import TunicChar from './components/TunicChar.vue'
import TextToIPA from './components/TextToIPA.vue'

const words = require('./words.json');
const phonemes = require('./phonemes.json');

const flip = function(obj) {
      const ret = {};
      Object.keys(obj).forEach(key => {
        ret[obj[key]] = key;
      });
      return ret;
    }

const vowels = flip(phonemes.vowels);
const consonants = flip(phonemes.consonants);

export default {
  name: 'App',
  components: {
    TextToIPA,
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
    },
    getChars: function (pair) {
      const consonant = pair[0] > 0 ? this.consonants[pair[0]]||"?" : ""
      const vowel = pair[1] > 0 ? this.vowels[pair[1]]||"?" : ""
      return pair[2] ? vowel + consonant : consonant + vowel;
    },
    getIPA: function (word) {
      return word.map(pair => this.getChars(pair)).join("");
    }
  },
  data() {
    return {
      vowels, consonants,
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
      words: words,
      dict: []
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

.phoneme {
  color: blue;
}

.charGrid .head {
  text-align: center;
  grid-column: span 6;
}

.charGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  font-size: 22px;
}

.wordGrid .head {
  text-align: center;
  grid-column: span 3;
}

.wordGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 22px;
}

.wordGrid > span {
    white-space: nowrap;
    border: 1px solid grey;
}

.wordSpan {
  margin-right: 0.25em;
}
</style>
