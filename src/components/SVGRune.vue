<template>
  <svg :viewBox="viewBox">
    <line class="innerLine" :x1="line[0][0]" :y1="line[0][1]" :x2="line[1][0]" :y2="line[1][1]" v-for="(line) in innerLines" :key="line"/>
    <line class="outerLine" :x1="line[0][0]" :y1="line[0][1]" :x2="line[1][0]" :y2="line[1][1]" v-for="(line) in outerLines" :key="line"/>
    <line class="centerLine" :x1="leftX" :y1="centerLineY" :x2="rightX" :y2="centerLineY" />
    <circle class="swap" :cx="centerX" :cy="circlePosition" :r="circleR" v-if="circle"/>
  </svg>
</template>
<script>
const runeDefs = require('../runeDefs.json');
import { highliteSubject$ } from '../lib/highlite';

export default {
  name: 'SVGRune',
  components: {
    
  },
  props: ['rune'],
  computed: {
    centerX: function() {
      return this.lineLength*(Math.sqrt(3)/2);
    },
    leftX: function() {
      return 0;
    },
    rightX: function() {
      return this.centerX*2;
    },
    topY: function() {
      return 0;
    },
    bottomY: function() {
      return this.sideBottomY + this.sideTopY;
    },
    sideTopY: function() {
      return this.lineLength*(1/2);
    },
    sideBottomY: function() {
      return this.sideTopY + this.sideH;
    },
    middleTopY: function() {
      return this.sideTopY * 2;
    },
    middleBottomY: function() {
      return this.sideH;
    },
    centerLineY: function() {
      return this.middleTopY + (this.middleBottomY - this.middleTopY)/2;
    },
    sideH: function() {
       return this.middleTopY + this.strokeWidth*4;
    },
    circleR() {
      return this.sideH / 8;
    },
    circlePosition() {
      return this.bottomY + this.circleR;
    },
    svgH() {
      return this.bottomY + this.circleR*2;
    },
    viewBox() {
      return `0 0 ${this.rightX} ${this.svgH}`;
    },
    outerLineDefs() {
      return {
        b1: [[[this.centerX, this.topY], [this.rightX, this.sideTopY]]],
        b2: [[[this.leftX, this.sideTopY], [this.centerX, this.topY]]],
        b3: [[[this.leftX, this.sideTopY], [this.leftX, this.centerLineY]], [[this.leftX, this.middleBottomY], [this.leftX, this.sideBottomY]]],
        b4: [[[this.leftX, this.sideBottomY], [this.centerX, this.bottomY]]],
        b5: [[[this.centerX, this.bottomY], [this.rightX, this.sideBottomY]]],
      }
    },
    outerLines() {
      return runeDefs.vowels[this.rune[1]]?.def?.flatMap( k => this.outerLineDefs[k] );
    },
    innerLineDefs() {
      return {
        i1: [[[this.leftX, this.sideTopY], [this.centerX, this.middleTopY]]],
        i2: [[[this.centerX, this.centerLineY], [this.centerX, this.topY]]],
        i3: [[[this.centerX, this.middleTopY], [this.rightX, this.sideTopY]]],
        i4: [[[this.centerX, this.middleBottomY], [this.rightX, this.sideBottomY]]],
        i5: [[[this.centerX, this.middleBottomY], [this.centerX, this.bottomY]], [[this.centerX, this.middleTopY], [this.centerX, this.centerLineY]]],
        i6: [[[this.leftX, this.sideBottomY], [this.centerX, this.middleBottomY]]],
      }
    },
    innerLines() {
      return runeDefs.consonants[this.rune[0]]?.def?.flatMap( k => this.innerLineDefs[k] );
    },
    circle() {
      return this.rune[2];
    },
    innerHighlite() {
      return this.highlite && this.highlite[0] > 0 && this.highlite[0] == this.rune[0];
    },
    outerHighlite() {
      return this.highlite && this.highlite[1] > 0 && this.highlite[1] == this.rune[1];
    },
    swapHighlite() {
      return this.highlite && this.highlite[2] > 0 && this.highlite[2] == this.rune[2];
    }, 
    innerColor() {
      return this.innerHighlite ? this.highliteColor : "currentcolor"
    },
    outerColor() {
      return this.outerHighlite ? this.highliteColor : "currentcolor"
    },
    swapColor() {
      return this.swapHighlite ? this.highliteColor : "currentcolor"
    },
  },
  data() {
    return {
      lineLength: 100,
      strokeWidth: 24,
      highliteColor: 'green',
      highlite: [0,0,0],
      hightliteSubscription$: null,
    }
  },
  mounted() {
    this.hightliteSubscription$ = highliteSubject$.subscribe((rune) => this.highlite = rune);
  },
  unmounted() {
    this.hightliteSubscription$.unsubscribe();
  }

}
</script>
<style scoped>
  svg {
    height: 1.6em;
    width: auto;
    overflow: visible;
    padding-top: 0.2em;
    padding-bottom: 0.1em;
    margin-left: 0.1em;
    margin-right: -0.1em;
  }

  line, circle {
    stroke-width: v-bind(strokeWidth);
    stroke-linecap: round;
    fill: none;
    shape-rendering: geometricPrecision;
  }

  .innerLine {
    stroke: v-bind(innerColor);
  }

  .outerLine {
    stroke: v-bind(outerColor);
  }

  .centerLine {
    stroke: currentcolor;
  }

  .swap {
    stroke: v-bind(swapColor);
  }

</style>
