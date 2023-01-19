<template>
  <div class="runeGrid">
    <span
      @click="click(i)"
      @mouseover="mouseOver(wordRunes[i])"
      @mouseout="mouseOut()"
      v-for="(rune,i) in runes" :key="i"
    >
      <span class="hotkey" v-if="i">
        {{ hotKey(i) }}
      </span>     
       <span class="rune" v-if="i">
        <SVGRune :rune="wordRunes[i]" :highlite="highlite" />
      </span>
      <span class="phoneme" v-if="i && runeType != 'swap'">
          {{ rune.phoneme }}
      </span>
      <span class="swap" v-if="i && runeType == 'swap'">
        <font-awesome-icon class="icon" icon="fa-solid fa-arrows-rotate" />
      </span>
      <span class="trash" v-if="!i">
        <span><font-awesome-icon class="icon" icon="fa-solid fa-circle-xmark" /></span>
      </span>
    </span>
  </div>
</template>
<script>
  import SVGRune from './SVGRune.vue'
  const runeDefs = require('../runeDefs.json');

  export default {
    name: 'RunePartGrid',
    components: { 
      SVGRune
    },
    data: function() {
      return {
        runes: runeDefs[this.runeType],
        gridWidth: runeDefs[this.runeType].length < 6 ? runeDefs[this.runeType].length : 6,
        trashRow: runeDefs[this.runeType].length < 6 ? 1 : Math.floor(runeDefs[this.runeType].length/6)+1,
        trashColumn: runeDefs[this.runeType].length < 6 ? 2 : 1,
        trashSpan: runeDefs[this.runeType].length < 6 ? 5 : 6,
      }
    },
    props: ['runeType', 'highlite'],
    emits: ['pickRunePart', 'highliteRune'],
    computed: {
      typeIndex: function() {
        switch (this.runeType) {
          case 'consonants':
            return 0;
          case 'vowels':
            return 1;
          case 'swap':
            return 2;
        }
        return ""
      },
      wordRunes: function() {
        const wRunes = {};
        runeDefs[this.runeType].forEach( (_,i) => {
          wRunes[i] = [
            this.runeType == 'consonants' ? i : 0,
            this.runeType == 'vowels' ? i : 0,
            this.runeType == 'swap' ? i : 0,
          ]
        });
        return wRunes;
      }
    },
    methods: {
      hotKey: function(num) {
        let offset;
        switch (this.runeType) {
          case 'consonants':
            offset = 96;
            break;
          case 'vowels':
            offset = 64;
            break;
          case 'swap':
            offset = 45;
            break;
        }
        return String.fromCharCode(num+offset)
      },
      click: function (value) {
        this.$emit('pickRunePart', {
          typeIndex: this.typeIndex,
          value
        });
      },
      mouseOver: function (rune) {
        this.$emit('highliteRune', rune)
      },
      mouseOut: function() {
        this.$emit('highliteRune', [0,0,0])
      },
    }

  }
</script>
<style scoped>
  .runeGrid {
    display: grid;
    grid-template-columns: repeat(v-bind(gridWidth), 16.6666%);
    border-top: 1px solid gray;
    border-left: 1px solid gray;
  }

  .runeGrid > span:first-of-type {
     grid-row: v-bind(trashRow); 
     grid-column: v-bind(trashColumn) / span v-bind(trashSpan);
  }
  .runeGrid > span {
    line-height: 1.5em;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    cursor: pointer;
    user-select: none;
    display: grid;
    text-align: center;
    grid-template-columns: 33.3% 33.3% 33.3%;
  }

  .runeGrid > span:hover {
    background-color: #f0f0f0;
  }

  .trash {
    display: inline-grid;
    grid-column: span 3;
    align-items: center;
    justify-content: center;
  }

  .swap {
    width: 100%;
  }
  .swap .icon {
    width: 60%;
  }

  .hotkey {
    font-size: 1.2em;
  }

  .rune {
    filter: drop-shadow(0.04em 0.04em 0.05em rgb(0 0 0 / 0.4)); 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -0.1em;
  }

</style>