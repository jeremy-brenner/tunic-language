<template>
  <div class="runeWord">
    <SVGRune 
      :rune="rune" 
      v-for="(rune) in word" :key="rune" 
    />
  </div>
</template>
<script>
import SVGRune from './SVGRune.vue'

export default {
  name: 'RuneWord',
  components: {
    SVGRune
  },
  props: ['word']
}
</script>
<style scoped>

.runeWord {
  display: inline-block;
  filter: drop-shadow(0.05em 0.05em 0.05em rgb(0 0 0 / 0.5));
  margin-right: 0.5em;
}

</style>