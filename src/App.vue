<template>
  <div class="left">
    <div class='controls'>
      <span @click="createChar">Char +</span>
      <span @click="createWord">Word +</span>
      <span @click="delChar">Char -</span>
      <span @click="delWord">Word -</span>
      <span @click="clear">Clear</span>
      <div>Title:</div>
      <input type="text" v-model="title"><button @click="save">save</button>
    </div>
    <div class="title">- Consonants -</div>
    <CharacterGrid charType="consonants" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <div class="title">- Vowels -</div>
    <CharacterGrid charType="vowels" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <div class="title">- Swap -</div>
    <CharacterGrid  charType="swap" :centerLine="centerLine" :highlite="highlite" v-on:pickCharPart="pickCharPart" v-on:highliteChar="highliteChar"/>
    <div class="title">- IPA Lookup -</div>
    <TextToIPA />
  </div>
  <div class="right">
    <div class="entries">
      <WordView :words="currentEntry" :position="position" :centerLine="centerLine" :highlite="highlite" v-on:highliteChar="highliteChar" v-on:selectChar="selectChar" />
      <div class="entry" v-for="entry in entries" :key="entry.words">
        <div class="title">{{  entry.title }}</div>
        <WordView :words="entry.words" :centerLine="centerLine" :highlite="highlite" v-on:highliteChar="highliteChar" />
      </div>
    </div>
  </div>
</template>

<script>
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
    save: function() {
      this.entries = [{entries: this.currentEntry, title: this.title}, ...this.entries];
     // localStorage.setItem('words', JSON.stringify(this.words));
      localStorage.setItem('entries', JSON.stringify(this.entries));

      this.clear();
    },
    pickCharPart: function(char) {
      this.currentEntry[this.position.word][this.position.char][char.typeIndex] = char.value;
    },
    clear() {
      this.currentEntry = [[[0,0,0]]];
      this.position = {
        word: 0,
        char: 0
      }
      this.title = ""
    },
    selectChar(word,char) {
      if(!this.currentEntry[word]) {
        this.currentEntry[word] = [];
      }
      if(!this.currentEntry[word][char]) {
        this.currentEntry[word][char] = [0,0,0];
      }
      this.position = {word, char};
    },
    createChar: function() {
      if(this.currentEntry[this.position.word][this.position.char+1]) {
        this.currentEntry[this.position.word].splice(this.position.char+1,0,[0,0,0]);
      }
      this.selectChar(this.position.word,this.position.char+1);
    },
    createWord: function() {
      if(this.currentEntry[this.position.word+1]) {
        this.currentEntry.splice(this.position.word+1,0,[]);
      }
      this.selectChar(this.position.word+1,0);
    },
    delChar: function() {
      if( this.currentEntry[this.position.word].length == 1 ){
        this.delWord();
        return;
      }
      this.currentEntry[this.position.word].splice(this.position.char,1);
      if(!this.currentEntry[this.position.word][this.position.char]) {
        this.selectChar(this.position.word,this.position.char-1);
      }
    },
    delWord: function() {
      if( this.currentEntry.length == 1 ){
        this.currentEntry = [];
        this.selectChar(0,0);
        return;
      } 
      this.currentEntry.splice(this.position.word,1);
      if(!this.currentEntry[this.position.word]) {
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
      currentEntry: [[[0,0,0]]],
      title: "",
      entries: JSON.parse(localStorage.getItem('entries'))
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

.controls {
  padding-top: 1em;
  display: grid;
  grid-template-columns: repeat(5, auto);
}

.controls > span {
  border: 1px solid grey;
  text-align: center;
  cursor: pointer;
  user-select: none; 
}

.controls > input {
  grid-column: span 3; 
}

.controls > div {
  text-align: right;
}

.left, .right {
  vertical-align: top;
  overflow: hidden;
  padding: 1em;
}

.left {

}

.entries {
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}

.entry {
  padding-top: 1em;
}

.entry > .title {
  font-weight: bold;
  padding-bottom: 0.25em;
}
</style>
