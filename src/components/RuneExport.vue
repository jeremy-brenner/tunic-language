<template>
  <div class="runeExport">
    <SVGRune ref="rune" :rune="rune" />
    <img ref="runeImage" @load="imgLoaded" />
  </div>
</template>
<script>
import SVGRune from './SVGRune';

export default {
  name: 'RuneExport',
  components: {
    SVGRune
  },
  props: ['rune', 'runeIndex'],
  emits: ['exportDone'],
  methods: {
    imgLoaded() {
      const runeCanvas = document.createElement('canvas');
      const padding = 10;
      runeCanvas.width = this.$refs.runeImage.width+padding*2;
      runeCanvas.height = this.$refs.runeImage.height+padding*2;
      const ctx = runeCanvas.getContext('2d');
      ctx.fillStyle = "white";
      ctx.fillRect( 0, 0, this.$refs.runeImage.width+padding*2, this.$refs.runeImage.height+padding*2 );
      ctx.drawImage(this.$refs.runeImage, padding, padding, this.$refs.runeImage.width, this.$refs.runeImage.height );
      runeCanvas.toBlob((blob) => {
        this.$emit('exportDone', {runeIndex:this.runeIndex, blob});
      }, "image/png")
    },
  },
  mounted() {
    const svg = this.$refs.rune.$el;
    const xml = new XMLSerializer().serializeToString(svg);
    const b64 = btoa(xml);
    const src = `data:image/svg+xml;base64,${b64}`
    this.$refs.runeImage.src = src;
  }
}
</script>
<style scoped>
</style>