<template>
    <div class='controls'>
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
    </div>
</template>
<script>

  import * as editor from '../lib/editor.js';

  export default {
    name: 'EditorControls',
    components: {
      
    },
    props: [],
    methods: {
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
    },
  }

</script>
<style scoped>
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
  grid-column: span 4; 
}

.controls > div {
  text-align: right;
}
</style>