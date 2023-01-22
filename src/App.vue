<template>
  <div class="left">
    <div class="title">- Consonants -</div>
    <RunePartGrid runeType="consonants" />
    <div class="title">- Vowels -</div>
    <RunePartGrid runeType="vowels" />
    <div class="title">- Swap -</div>
    <RunePartGrid  runeType="swap" />
    <div class="title">- Entries -</div>
    <RuneBook />
  </div>
  <div class="right">
    <RuneEditor />
  </div>
  <SidePanel />
</template>

<script>
import RunePartGrid from './components/RunePartGrid.vue'
import RuneEditor from './components/RuneEditor.vue'
import RuneBook from './components/RuneBook.vue'
import SidePanel from './components/SidePanel.vue'

export default {
  name: 'App',
  components: {
    RunePartGrid,
    RuneEditor,
    RuneBook,
    SidePanel
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  font-size: 20px;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 25em auto;
}

.left, .right {
  vertical-align: top;
  overflow: hidden;
  padding: 1.25em;
  display: flex;
  flex-direction: column;
}

.left .title {
  text-align: center;
  padding-top: 0.5em;
}

.icon {
  width: 1em;
  padding-top: 0.3em;
} 

input, button {
  font-size: 0.8em;
}

</style>
