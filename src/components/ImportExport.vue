<template>
  <div class="importExport">
    <span>
      <a :href="exportURI" download="tunic-export.json">
        Export entries
        <font-awesome-icon class="icon" icon="fa-solid fa-download"/>
      </a>
    </span>
    <span>
      Import entries
      <input ref="fileupload" type="file" name="fileupload" @change="importBooks" />
      <font-awesome-icon class="icon" icon="fa-solid fa-upload" />
    </span>
    <span @click="runRuneExport">
      Export runes
      <!-- <font-awesome-icon class="icon" icon="fa-solid fa-download"/> -->
      <div class="hiddenStuff">
        <RuneExport :rune="rune.rune" :runeIndex=i v-for="(rune,i) in exportRunes" :key="rune" @exportDone="runeExported" />
      </div>
    </span>
    <RuneZip :runes="exportRunes"  v-if="exportDone"/>

  </div>
</template>
<script>

import * as runeBook from '../lib/runeBook.js';
import * as editor from '../lib/editor.js';
import RuneExport from './RuneExport.vue';
import RuneZip from './RuneZip.vue';

const runeDefs = require('../runeDefs.json');
const runesToExport = [
  ...runeDefs.consonants.map((c,i) => i ).filter(i => i).map(i => ({runeType: 'consonants', exported: false, rune: [i,0,0]})),
  ...runeDefs.vowels.map((v,i) => i ).filter(i => i).map(i => ({runeType: 'vowels', exported: false, rune:[0,i,0]})),
  {runeType: 'swap', exported: false, rune:[0,0,1]}
];

export default {
  name: 'ImportExport',
  components: {
    RuneExport, RuneZip
  },
  props: [],
  data() {
    return {
      export: '',
      exportRunes: []
    }
  },
  computed: {
    exportDone() {
      return this.numRunes > 0 && this.numRunesExported == this.numRunes
    },
    numRunes() {
      return this.exportRunes.length
    },
    numRunesExported() {
      return this.exportRunes.filter(r => r.exported==true).length
    },
    exportURI() {
      return "data:application/octet-stream," + encodeURIComponent(this.export);
    }
  },
  methods: {
    importBooks() {
      this.$refs.fileupload.files[0].text().then(json =>{
        this.$refs.fileupload.value = null;
        runeBook.importBooks(json);
        editor.clear();
      });
    },
    runeExported(runeExport) {
      this.exportRunes[runeExport.runeIndex].blob = runeExport.blob;
      this.exportRunes[runeExport.runeIndex].exported = true;
    },
    runRuneExport() {
      this.exportRunes = runesToExport;
    },
    imgLoaded() {
      this.$refs.runeCanvas.getContext('2d').drawImage(this.$refs.runeImage, 0, 0);
    }
  },
  mounted() {
    this.booksSubscription$ = runeBook.booksSubject$.subscribe( books => {
      this.export = books.export;
    });
  },
  unmounted() {
    this.booksSubscription$.unsubscribe();
  },
}
</script>
<style scoped>

.importExport {
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
}

.importExport > span {
  border: 1px solid black;
  flex: 1;
  text-align: center;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  padding: 0.25em;
}

.importExport > span > input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.importExport > span:hover {
  background-color: #f0f0f0;
}


a:link , a:visited, a:hover,a:active {
  text-decoration: none;
  color: currentcolor;
}

.hiddenStuff {
  display: none;
}
</style>
