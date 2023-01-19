<template>
  <div class="rune">
    <div class='centerLine' v-if="renderCenterLine"></div>
     <div class="dot" v-if="renderDot"></div> 
    <div  class="rotated" :class="classObject" >
      <div class='frontLeft'></div>
      <div class='backLeft'></div>
      <div class='frontRight'></div>
      <div class='backRight'></div>
      <div class='top'></div>
      <div class='bottom'></div>
    </div>
  </div>
</template>
<script>
const runeDefs = require('../runeDefs.json');

export default {
  name: 'TunicRune',
  components: {
    
  },
  props: {
    rune: {
      type: Array,
      required: true,
    },
    highlite: {
      type: Array,
      required: true,
    },
    centerLine: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  computed: {
    renderDot() {
      return this.rune[2] && this.rune[2] === 1;
    },
    renderCenterLine() {
      return this.centerLine;
    },
    classObject() {
      const consonantDef = runeDefs.consonants[this.rune[0]]?.def || [];
      const vowelDef = runeDefs.vowels[this.rune[1]]?.def || [];
      return [...consonantDef, ...vowelDef];
    },
    innerHighlite() {
      return this.highlite[0] > 0 && this.highlite[0] == this.rune[0];
    },
    outerHighlite() {
      return this.highlite[1] > 0 && this.highlite[1] == this.rune[1];
    },
    swapHighlite() {
      return this.highlite[2] > 0 && this.highlite[2] == this.rune[2];
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
      edgeLen: '0.6em',
      borderWidth: '0.13em',
      highliteColor: 'green'
    }
  },
}
</script>
  
<style scoped>
  .rune {
    --face-height: calc(v-bind(edgeLen)*1.5);
    position: relative;
    display: inline-block;
    width: calc(v-bind(edgeLen)*1.3);
    height: calc(var(--face-height)*1.3);
    margin-top: 0.2em;
    margin-bottom: -0.1em;
    filter: blur(0.02em);

  }
  .rotated {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;  
    transform: rotateX(-35deg) rotateY(-45deg);
    margin-left: -0.09em;
    margin-top: calc(v-bind(edgeLen)/2);
  }

  .centerLine {
    position: absolute;
    z-index: 10;
    overflow: hidden;
    top: 50%;
    width: calc(v-bind(edgeLen)*1.4);
    height: calc(v-bind(borderWidth)); 
    border-width: calc(v-bind(borderWidth)*0.7); 
    box-sizing: content-box;
    border-style: solid none none none;
    border-top-color: 'currentcolor';
    background-color: white;
    border-bottom-width: 0;
  }

  .dot {
    position: absolute;
    z-index: 10;
    overflow: hidden;
    top: 100%;
    left: calc(v-bind(edgeLen)*0.5 - v-bind(borderWidth)/8);
    width: calc(v-bind(borderWidth)); 
    height: calc(v-bind(borderWidth)); 
    border-width: calc(v-bind(borderWidth)*0.7); 
    box-sizing: content-box;
    border-style: solid;
    border-color: v-bind(swapColor);
    border-radius: 100%; 
  }
  .rotated div {
    box-sizing: border-box;
    position: absolute;    
    border-width: v-bind(borderWidth); 
    width: v-bind(edgeLen); 
    border-style: none;
  }

  .top {
    border-color: v-bind(outerColor) v-bind(innerColor) v-bind(innerColor) v-bind(outerColor);
  }

  .bottom {
    border-color: v-bind(innerColor) v-bind(outerColor) v-bind(outerColor) v-bind(innerColor);
  }

  .frontLeft {
    border-right-color: v-bind(innerColor);
    border-left-color: v-bind(outerColor);
  }
  
  .frontRight {
    border-left-color: v-bind(innerColor); 
  }

  .backLeft {
    border-right-color: v-bind(innerColor);
  }

  .backRight {
    border-left-color: v-bind(innerColor);
  } 

  .b1 .top {
    border-top-style: solid;
  }
  
  .b2 .top {
    border-left-style: solid;
  }

  
  .b3 .frontLeft {
    border-left-style: solid;
  }

  .b4 .bottom {
      border-bottom-style: solid;
    }

  
  .b5 .bottom {
      border-right-style: solid;
    }

  
  .i1 .top {
      border-bottom-style: solid;
    }

  
  .i2 .backLeft {
      border-right-style: solid;
    }
  .i2 .backRight {
      border-left-style: solid;
    }
  
  .i3 .top {
      border-right-style: solid;
    }

  
  .i4 .bottom {
      border-top-style: solid;
   }
  
  .i5 .frontLeft {
      border-right-style: solid;
    }
  .i5 .frontRight {
      border-left-style: solid;
    }

  
  .i6 .bottom {
      border-left-style: solid;
    }

  
  .top, .bottom {
    height: v-bind(edgeLen);
  }
  
  .rotated .frontLeft {
    height: var(--face-height);
    border-right-width: calc(v-bind(borderWidth)/2); 
  }
  
  .rotated .backLeft {
    height: var(--face-height);
    transform:  translate3d( calc(v-bind(edgeLen)/-2),  0, calc(v-bind(edgeLen)/-2)) rotateY(90deg);
    border-right-width: calc(v-bind(borderWidth)/2); 
  }
  
  .rotated .frontRight {
    height: var(--face-height);
    transform:  translate3d( calc(v-bind(edgeLen)/2),  0, calc(v-bind(edgeLen)/-2)) rotateY(90deg);
    border-left-width: calc(v-bind(borderWidth)/2); 
  }
  
  .rotated .backRight {
    height: var(--face-height);
    transform: translate3d(0,  0, calc(v-bind(edgeLen)*-1));
    border-left-width: calc(v-bind(borderWidth)/2); 
  }
  
  .rotated .top {
    transform: rotateX(90deg) translate3d(0, calc(v-bind(edgeLen)/-2), calc(v-bind(edgeLen)/2));
  }

  .rotated .bottom {
    transform: rotateX(90deg) translate3d(0, calc(v-bind(edgeLen)/-2), calc(v-bind(edgeLen)*-1));
  }

</style>
  