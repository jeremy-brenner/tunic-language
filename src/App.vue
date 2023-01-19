<template>
  <div class="left">
    <div class='controls'>
      <div>Title:</div>
      <input type="text" v-model="title"><button @click="save">save</button>
      <span @click="delWord" title="Delete Word">
        <font-awesome-icon class="icon" icon="fa-solid fa-backward-fast" />
      </span>
      <span @click="delRune" title="Delete Rune">
        <font-awesome-icon class="icon" icon="fa-solid fa-backward-step" />
      </span>
      <span @click="createRune" title="Create Rune">
        <font-awesome-icon class="icon" icon="fa-solid fa-forward-step" />
      </span>
      <span @click="createWord" title="Create Word">
        <font-awesome-icon class="icon" icon="fa-solid fa-forward-fast" />
      </span>
      <span @click="clear" title="Clear All">
        <font-awesome-icon class="icon" icon="fa-solid fa-dumpster-fire" />
      </span>

    </div>
    <div class="title">- Consonants -</div>
    <RunePartGrid runeType="consonants" :centerLine="centerLine" :highlite="highlite" v-on:pickRunePart="pickRunePart" v-on:highliteRune="highliteRune"/>
    <div class="title">- Vowels -</div>
    <RunePartGrid runeType="vowels" :centerLine="centerLine" :highlite="highlite" v-on:pickRunePart="pickRunePart" v-on:highliteRune="highliteRune"/>
    <div class="title">- Swap -</div>
    <RunePartGrid  runeType="swap" :centerLine="centerLine" :highlite="highlite" v-on:pickRunePart="pickRunePart" v-on:highliteRune="highliteRune"/>
    <div class="title">- IPA Lookup -</div>
    <TextToIPA />
  </div>
  <div class="right">
    <div class="entries">
      <WordView :words="currentEntry" :position="position" :centerLine="centerLine" :highlite="highlite" showPhonics=true showEnglish=true v-on:highliteRune="highliteRune" v-on:selectRune="selectRune" />
      <div class="entry" v-for="(entry,i) in entries" :key="entry.words">
        <div class="entryHeader">
          <span class="entryTitle">
          {{  entry.title }}
          </span>
          <span class="entryControls">
            <font-awesome-icon class="icon" icon="fa-solid fa-angle-up" @click="moveUp(i)" />
            <font-awesome-icon class="icon" icon="fa-solid fa-angle-down" @click="moveDown(i)" />
            <font-awesome-icon class="icon" icon="fa-solid fa-pencil" @click="editEntry(i)" />
            <font-awesome-icon class="icon" icon="fa-solid fa-trash-can" @click="deleteEntry(i)" />
          </span>
        </div>   
        <WordView :words="entry.words" :centerLine="centerLine" :highlite="highlite" showPhonics=true showEnglish=true v-on:highliteRune="highliteRune" />
      </div>
    </div>
  </div>
</template>

<script>
import RunePartGrid from './components/RunePartGrid.vue'
import WordView from './components/WordView.vue'
import TextToIPA from './components/TextToIPA.vue'

export default {
  name: 'App',
  components: {
    RunePartGrid,
    WordView,
    TextToIPA,
  },
  methods: {
    store: function() {
      localStorage.setItem('entries', JSON.stringify(this.entries));
    },
    save: function() {
      const entry =  {title: this.title, words: this.currentEntry}
      if(this.editingIndex == -1) {
        this.entries = [entry, ...this.entries];
      } else {
        this.entries[this.editingIndex] = entry;
      }
      this.store();
      this.clear();
    },
    moveUp(i) {
      if(i == 0) {
        return;
      }
      const moving = this.entries[i];
      this.entries[i] = this.entries[i-1];
      this.entries[i-1] = moving;
      this.store();
    },
    moveDown(i) {
      if(i == this.entries.length - 1) {
        return;
      }
      const moving = this.entries[i];
      this.entries[i] = this.entries[i+1];
      this.entries[i+1] = moving;
      this.store();
    },
    editEntry(i) {
      this.clear();
      this.currentEntry = JSON.parse(JSON.stringify(this.entries[i].words));
      this.title = this.entries[i].title;
      this.editingIndex = i;
    },
    deleteEntry(i) {
      this.entries.splice(i,1);
      this.store();
    },
    pickRunePart: function(rune) {
      this.currentEntry[this.position.word][this.position.rune][rune.typeIndex] = rune.value;
    },
    clear() {
      this.currentEntry = [[[0,0,0]]];
      this.position = {
        word: 0,
        rune: 0
      }
      this.title = "";
      this.editingIndex = -1;
    },
    selectRune(word,rune) {
      if(!this.currentEntry[word]) {
        this.currentEntry[word] = [];
      }
      if(!this.currentEntry[word][rune]) {
        this.currentEntry[word][rune] = [0,0,0];
      }
      this.position = {word, rune};
    },
    createRune: function() {
      if(this.currentEntry[this.position.word][this.position.rune+1]) {
        this.currentEntry[this.position.word].splice(this.position.rune+1,0,[0,0,0]);
      }
      this.selectRune(this.position.word,this.position.rune+1);
    },
    createWord: function() {
      if(this.currentEntry[this.position.word+1]) {
        this.currentEntry.splice(this.position.word+1,0,[]);
      }
      this.selectRune(this.position.word+1,0);
    },
    delRune: function() {
      if( this.currentEntry[this.position.word].length == 1 ){
        this.delWord();
        return;
      }
      this.currentEntry[this.position.word].splice(this.position.rune,1);
      if(!this.currentEntry[this.position.word][this.position.rune]) {
        this.selectRune(this.position.word,this.position.rune-1);
      }
    },
    delWord: function() {
      if( this.currentEntry.length == 1 ){
        this.currentEntry = [];
        this.selectRune(0,0);
        return;
      } 
      this.currentEntry.splice(this.position.word,1);
      if(!this.currentEntry[this.position.word]) {
        this.selectRune(this.position.word-1,0)
      }else{
        this.selectRune(this.position.word,0)
      }
    },
    highliteRune: function(rune) {
      this.highlite = rune
    }
  },
  data() {
    return {
      ready: false,
      centerLine: true,
      highlite: [0,0,0],
      position: {
        word: 0,
        rune: 0
      },
      currentEntry: [[[0,0,0]]],
      editingIndex: -1,
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
  grid-template-columns: 20em auto;
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

.controls > span:hover {
    background-color: aliceblue;
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

.left .title {
  text-align: center;
  padding-top: 0.5em;
}

.entries {
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}

.entry {
  padding-top: 1em;
}

.entryHeader {
  padding-bottom: 0.25em;
}

.entryTitle {
  font-weight: bold;
}

.entryControls {
  float: right;
  margin-right: 1em;
}
.entryControls > .icon {
  padding-right: 0.25em;
}

.icon {
  width: 1.25em;
  padding-top: 0.3em;
}

input, button {
  font-size: 0.8em;
}

</style>
