<template>
  <div class="left">
    <CenterLineToggle v-model="centerLine" />
    <CharacterGrid title="Consonants" charType="consonants" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <CharacterGrid title="Vowels" charType="vowels" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <CharacterGrid title="Swap" charType="swap" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <div class='controls'>
      <span @click="createChar">Char+</span>
      <span @click="createWord">Word+</span>
      <span @click="delChar">Char-</span>
      <span @click="delWord">Word-</span>
      <span @click="clear">Clear</span>
    </div>
    <WordView :words="currentWords" :position="position" :centerLine="centerLine" :highlite="highlite" v-on:highliteChar="highliteChar" v-on:selectChar="selectChar" />
  </div>
  <div class="right">
    <TextToIPA />
    <div class="words">
      <WordView :words="word.words" :centerLine="centerLine" :highlite="highlite" v-on:highliteChar="highliteChar" v-for="word in words" :key="word.words" />
    </div>
  </div>
</template>

<script>
const words = require('./words.json');

import TextToIPA from './components/TextToIPA.vue' 
import CenterLineToggle from './components/CenterLineToggle.vue'
import CharacterGrid from './components/CharPartGrid.vue'
import WordView from './components/WordView.vue'

export default {
  name: 'App',
  components: {
    TextToIPA,
    CenterLineToggle,
    CharacterGrid,
    WordView,
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  font-size: 24px;
  margin: 1em;
}
.controls {
  margin-top: 2em;
}
.controls span {
  display: inline-block;
  border: 1px solid grey;
  width: 3em;
  text-align: center;
}
.left, .right {
  margin: 1em;
  vertical-align: top;
  display: inline-block;
}
.words {
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
}
</style>
