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
      position: {
        word: 0,
        rune: 0
      },
      currentEntry: [[[0,0,0]]],
      stateSubscription$: null
    }
  },
  methods: {
    selectRune(word,rune) {
      editor.selectRune(word,rune);
    },
  },
  mounted() {
    this.stateSubscription$ = editor.stateSubject$.subscribe( state => {
      this.position = state.position;
      this.currentEntry = state.currentEntry;
    });
  },
  unmounted() {
    this.stateSubscription$.unsubscribe();
  },
}

</script>
<style scoped>

</style>
