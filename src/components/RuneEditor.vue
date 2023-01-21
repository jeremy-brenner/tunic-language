<template>
  <WordView :words="currentEntry" :position="position" showPhonics=true showEnglish=true v-on:selectRune="selectRune" />
</template>
<script>
import WordView from './WordView';

import * as editor from '../lib/editor.js';

export default {
  name: 'RuneEditor',
  components: { 
    WordView
  },
  data() {
    return {
      highlite: [0,0,0],
      position: {
        word: 0,
        rune: 0
      },
      currentEntry: [[[0,0,0]]],
      editingIndex: -1,
      title: "",
      stateSubscription$: null
    }
  },
  methods: {
    selectRune(word,rune) {
      editor.selectRune(word,rune);
    },
  },
  mounted() {
    this.stateSubscription$ = editor.stateSubject$.subscribe( state => Object.keys(state).forEach( k => this[k] = state[k]) );
  },
  unmounted() {
    this.stateSubscription$.unsubscribe();
  },
}

</script>
<style scoped>

</style>
