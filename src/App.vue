<template>
  <div class="left">
    <div class="title">- Consonants -</div>
    <CharacterGrid charType="consonants" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <div class="title">- Vowels -</div>
    <CharacterGrid charType="vowels" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <div class="title">- Swap -</div>
    <CharacterGrid  charType="swap" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <div class='controls'>
      <span @click="next">Next</span>
      <span @click="createChar">Char +</span>
      <span @click="createWord">Word +</span>
      <span @click="delChar">Char -</span>
      <span @click="delWord">Word -</span>
      <span @click="clear">Clear</span>
    </div>
    <div class="title">- IPA Lookup -</div>
    <TextToIPA />
  </div>
  <div class="right">
    <div class="words">
      <WordView :words="currentWords" :position="position" :centerLine="centerLine" :highlite="highlite" v-on:highliteChar="highliteChar" v-on:selectChar="selectChar" />
      <WordView :words="word.words" :centerLine="centerLine" :highlite="highlite" v-on:highliteChar="highliteChar" v-for="word in words" :key="word.words" />
    </div>
  </div>
</template>

<script>
const words = require('./words.json');

import CharacterGrid from './components/CharPartGrid.vue'
import WordView from './components/WordView.vue'
import TextToIPA from './components/TextToIPA.vue'

export default {
  name: 'App',
  components: {
    CharacterGrid,
    WordView,
    TextToIPA,
  },
  methods: {
    pickCharPart: function(char) {
      this.currentWords[this.position.word][this.position.char][char.typeIndex] = char.value;
    },
    clear() {
      this.currentWords = [[[0,0,0]]];
      this.position = {
        word: 0,
        char: 0
      }
    },
    selectChar(word,char) {
      if(!this.currentWords[word]) {
        this.currentWords[word] = [];
      }
      if(!this.currentWords[word][char]) {
        this.currentWords[word][char] = [0,0,0];
      }
      this.position = {word, char};
    },
    next: function() {
      if(this.currentWords[this.position.word][this.position.char].some(i => i>0)) {
        this.createChar();
        return;
      }
      this.delChar();
      this.createWord();
    },
    createChar: function() {
      if(this.currentWords[this.position.word][this.position.char+1]) {
        this.currentWords[this.position.word].splice(this.position.char+1,0,[0,0,0]);
      }
      this.selectChar(this.position.word,this.position.char+1);
    },
    createWord: function() {
      if(this.currentWords[this.position.word+1]) {
        this.currentWords.splice(this.position.word+1,0,[]);
      }
      this.selectChar(this.position.word+1,0);
    },
    delChar: function() {
      if( this.currentWords[this.position.word].length == 1 ){
        this.delWord();
        return;
      }
      this.currentWords[this.position.word].splice(this.position.char,1);
      if(!this.currentWords[this.position.word][this.position.char]) {
        this.selectChar(this.position.word,this.position.char-1);
      }
    },
    delWord: function() {
      if( this.currentWords.length == 1 ){
        this.currentWords = [];
        this.selectChar(0,0);
        return;
      } 
      this.currentWords.splice(this.position.word,1);
      if(!this.currentWords[this.position.word]) {
        this.selectChar(this.position.word-1,0)
      }else{
        this.selectChar(this.position.word,0)
      }
    },
    highliteChar: function(char) {
      this.highlite = char
    }
  },
  data() {
    return {
      ready: false,
      centerLine: true,
      highlite: [0,0,0],
      position: {
        word: 0,
        char: 0
      },
      currentWords: [[[0,0,0]]],
      words
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  font-size: 24px;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 25em auto;
}

.title {
  text-align: center;
}

.controls {
  padding-top: 1em;
}

.controls span {
  display: inline-block;
  border: 1px solid grey;
  width: 4em;
  text-align: center;
}

.left, .right {
  vertical-align: top;
  overflow: hidden;
  padding: 1em;
}

.left {

}

.words {
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
