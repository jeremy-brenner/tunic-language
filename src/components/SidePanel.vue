<template>
  <div id="sidepanel">
    <div class="panel" v-if="isOpen">
      <div class="title">- IPA Lookup -</div>
      <TextToIPA />
      <div class="title">- Import / Export -</div>
      <ImportExport />
    </div>
    <div class="tabContainer">
      <div class="emptytop"></div>
      <div class="tab" @click="toggleOpen">
        <font-awesome-icon class="icon" icon="fa-solid fa-angle-left" v-if="isOpen"/>
        <font-awesome-icon class="icon" icon="fa-solid fa-angle-right" v-if="!isOpen" />
      </div>
      <div class="emptybottom"></div>
    </div>
  </div>
</template>
<script>
import TextToIPA from './TextToIPA.vue'
import ImportExport from './ImportExport.vue'

export default {
  name: 'SidePanel',
  components: {
    TextToIPA,
    ImportExport,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleOpen: function() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
<style scoped>
  #sidepanel {
    position: absolute;
    height: 100vh;
    display: flex;
  }
  #sidepanel > .panel {
    padding: 1em;
    background-color: white;
  } 

  .title {
    text-align: center;
    padding-top: 0.5em;
  }
  .tabContainer {
    display: flex;
    flex-direction: column;
  }
  
  .tabContainer > div {
    border-width: 1px;
    border-color: black;
  }
  .tab {
    background-color: white;
    flex: 0;
    border-style: solid solid solid none;
    padding: 1em 0;
    width: 1em;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
    padding-left: -0.125em;
  }
  .emptytop, .emptybottom {
    flex: 1;
    border-style: none none none solid;
  }
</style>