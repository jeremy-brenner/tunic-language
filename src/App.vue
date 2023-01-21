<template>
  <div class="left">
    <div class='controls'>
      <div>Title:</div>
      <input type="text" v-model="title" @keydown.stop=""><button @click="save">save</button>
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
    <RunePartGrid runeType="consonants" v-on:pickRunePart="pickRunePart" />
    <div class="title">- Vowels -</div>
    <RunePartGrid runeType="vowels" v-on:pickRunePart="pickRunePart" />
    <div class="title">- Swap -</div>
    <RunePartGrid  runeType="swap" v-on:pickRunePart="pickRunePart" />
    <div class="title">- IPA Lookup -</div>
    <TextToIPA />
  </div>
  <div class="right">
    <RuneEditor />
    <div class="entries">
      <div class="entry" v-for="(entry,i) in filteredEntries" :key="entry.words">
        <div class="entryHeader">
          <span class="entryTitle">
          {{ entry.title }}
          </span>
          <span class="entryControls">
            <font-awesome-icon class="icon" icon="fa-solid fa-angle-up" @click="moveUp(i)" />
            <font-awesome-icon class="icon" icon="fa-solid fa-angle-down" @click="moveDown(i)" />
            <font-awesome-icon class="icon" icon="fa-solid fa-pencil" @click="editEntry(i)" />
            <font-awesome-icon class="icon" icon="fa-solid fa-trash-can" @click="deleteEntry(i)" />
          </span>
        </div>   
        <WordView :words="entry.words" showPhonics=true showEnglish=true />
      </div>
    </div>
  </div>
</template>

<script>
import RunePartGrid from './components/RunePartGrid.vue'
import WordView from './components/WordView.vue'
import TextToIPA from './components/TextToIPA.vue'
import RuneEditor from './components/RuneEditor.vue'

import * as editor from './lib/editor.js';

const example = [{ 
    title:"Example",
    words:[[[9,3,1],[17,1,0],[1,0,0],[4,6,0],[24,0,0]],[[21,8,0],[2,0,0],[17,0,0]]]
}];
export default {
  name: 'App',
  components: {
    RunePartGrid,
    WordView,
    TextToIPA,
    RuneEditor
  },
  methods: {
    clear: function() {
      editor.clear();
    },
    createWord: function() {
      editor.createWord();
    },
    createRune: function() {
      editor.createRune();
    },  
    delRune: function() {
      editor.delRune();
    },
    delWord: function() {
      editor.delWord();
    },
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
      editor.clear();
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
      editor.loadEntry(this.entries[i],i);
    },
    deleteEntry(i) {
      this.entries.splice(i,1);
      this.store();
    },
    pickRunePart: function(rune) {
      editor.pickRunePart(rune);
    },
  },
  computed: {
    currentWord: function() {
      return this.currentEntry[this.position.word];
    },
    currentRune: function() {
      return this.currentWord[this.position.rune];
    },
    filteredEntries: function() {
      return this.entries.filter((e,i) => i!=this.editingIndex)
    }
  },
  data() {
    return {
      editingIndex: -1,
      title: "",
      entries: JSON.parse(localStorage.getItem('entries')) || example,
      stateSubscription$: null
    }
  },
  mounted() {
    this.stateSubscription$ = editor.stateSubject$.subscribe( state => {
      this.editingIndex = state.editingIndex;
      this.title = state.title;
    });
  },
  unmounted() {
    this.stateSubscription$.unsubscribe();
  },
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
  font-size: 20px;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 25em auto;
}

.controls {
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
    background-color: #f0f0f0;
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
  display: flex;
  flex-direction: column;
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
