<template>
  <div class="runeEditor">
    <div class="controls">
      <span>Title:</span>
      <input type="text" v-model="title" @keydown.stop="" @keyup="keyup">
      <span title="Save" @click="save">
        <font-awesome-icon class="icon" icon="fa-solid fa-floppy-disk" />
      </span>
      <span title="Clear All" @click="clear">
        <font-awesome-icon class="icon" icon="fa-solid fa-dumpster-fire" />
      </span>
    </div>
    <EditorControls />
    <div class="words">
      <WordView :words="currentEntry" :position="position" :showPhonics=true :showEnglish=true v-on:selectRune="selectRune" />
    </div>
  </div>
</template>
<script>
import WordView from './WordView';
import EditorControls from './EditorControls.vue'

import * as editor from '../lib/editor.js';

export default {
  name: 'RuneEditor',
  components: { 
    WordView, EditorControls
  },
  data() {
    return {
      title: '',
      position: {
        word: 0,
        rune: 0
      },
      currentEntry: [[[0,0,0]]],
      stateSubscription$: null
    }
  },
  methods: {
    keyup() {
      editor.setTitle(this.title);
    },
    selectRune(word,rune) {
      editor.selectRune(word,rune);
    },
    clear: function() {
      editor.clear();
    },
    save() {
      editor.save();
    }
  },
  mounted() {
    this.stateSubscription$ = editor.stateSubject$.subscribe( state => {
      this.position = state.position;
      this.currentEntry = state.currentEntry;
      this.title = state.title;
    });
  },
  unmounted() {
    this.stateSubscription$.unsubscribe();
  },
}

</script>
<style scoped>
.runeEditor {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.controls {
  display: grid;
  grid-template-columns: repeat(8, auto);
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
  grid-column: span 5; 
}

.controls > div {
  text-align: right;
}

.words {
  flex: 1;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
