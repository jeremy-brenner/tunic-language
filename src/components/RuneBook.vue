<template>
  <!-- <div class="books">
    <span class="book" :class="{current: i==currentBook }" @click="selectBook(i)" v-for="(title,i) in bookTitles" :key="title">
      {{ title }}
    </span>
    <span @click="newBook" class="book">new</span>
    <span class="unused"></span>
  </div> -->
  <div class="entries">
    <div class="entry" :class="{editing: editing(i) }" v-for="(entry,i) in entries" :key="entry.words">
      <div class="entryHeader">
        <span class="entryTitle" @click="editEntry(i)">
          {{ entry.title }}
        </span>
        <span class="entryControls">
          <font-awesome-icon class="icon" icon="fa-solid fa-angle-up" @click="moveUp(i)" />
          <font-awesome-icon class="icon" icon="fa-solid fa-angle-down" @click="moveDown(i)" />
          <font-awesome-icon class="icon" icon="fa-solid fa-pencil" @click="editEntry(i)" />
          <font-awesome-icon class="icon" icon="fa-solid fa-trash-can" @click="deleteEntry(i)" />
        </span>
      </div>   
    </div>
  </div>
</template>
<script>
import * as editor from '../lib/editor.js';
import * as runeBook from '../lib/runeBook.js';

export default {
  name: 'RuneBook',
  components: {
  },
  data() {
    return {
      editingIndex: -1,
      currentBook: 0,
      bookTitles: [],
      entries: [],
      stateSubscription$: null,
      booksSubscription$: null,
    }
  },
  methods: {
    selectBook(i) {
      runeBook.selectBook(i);
    },
    moveUp(i) {
      runeBook.moveUp(i);
    },
    moveDown(i) {
      runeBook.moveDown(i);
    },
    editEntry(i) {
      editor.loadEntry(this.entries[i],i);
    },
    deleteEntry(i) {
      runeBook.deleteEntry(i);
    },
    editing(i) {
      return i == this.editingIndex;
    },
    newBook() {
      runeBook.newBook('something');
    },
  },
  mounted() {
    this.booksSubscription$ = runeBook.booksSubject$.subscribe( books => {
      this.currentBook = books.currentBook;
      this.bookTitles = books.bookTitles;
      this.entries = books.entries;
    });
    this.stateSubscription$ = editor.stateSubject$.subscribe( state => {
      this.editingIndex = state.editingIndex;
    });
    runeBook.load();
  },
  unmounted() {
    this.stateSubscription$.unsubscribe();
    this.booksSubscription$.unsubscribe();
  },
}
</script>
<style scoped>
.editing {
  border: 1px solid black;
}

.entries {
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
.entryHeader {
  display: flex;
}
.entryTitle {
  font-weight: bold;
  flex: 1;
}

.entry {
  cursor: pointer;
}

.entryControls > .icon {
  padding-right: 0.25em;
}

.books {
  display: flex;
}
.book {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  background-color: #f0f0f0;
  padding: 0.125em;
  cursor: pointer;
}
.current {
  background-color: white;
  border-bottom: none;
}
.unused {
  flex: 1;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

</style>