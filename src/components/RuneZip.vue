<template>
  <a :href="objectURL" download="tunic-chars.zip" v-if="ready">
    Download rune export
    <font-awesome-icon class="icon" icon="fa-solid fa-download"/>
 </a>
</template>
<script>  
import * as zip from "@zip.js/zip.js";

export default {
  name: 'RuneZip',
  components: {
  },
  data() {
    return {
      ready: false,
      objectURL: null
    }
  },
  props: ['runes'],
  mounted() {
    const zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"), { bufferedWrite: true });
    const adds = this.runes.map((rune) => {
      const filename = `${rune.rune.join('-')}.png`;
      return zipWriter.add(filename, new zip.BlobReader(rune.blob));
    });
    Promise.all(adds)
      .then(() => zipWriter.close())
      .then((zip) => URL.createObjectURL(zip))
      .then((objectURL) => this.objectURL = objectURL)
      .then(() => this.ready = true)
  }
}
</script>
<style scoped>
a {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: white;

}

a:link , a:visited, a:hover,a:active {
  text-decoration: none;
  color: currentcolor;
}


</style>