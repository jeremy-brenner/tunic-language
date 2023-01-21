import { Subject } from 'rxjs';

const stateSubject$ = new Subject();

const state = {
  highlite: [0,0,0],
  position: {
    word: 0,
    rune: 0
  },
  currentEntry: [[[0,0,0]]],
  editingIndex: -1,
  title: "",
}

function currentWord() {
  return state.currentEntry[state.position.word];
}

function currentRune() {
  return currentWord()[state.position.rune];
}

function createRune() {
  if(state.currentEntry[state.position.word][state.position.rune+1]) {
    state.currentEntry[state.position.word].splice(state.position.rune+1,0,[0,0,0]);
  }
  selectRune(state.position.word,state.position.rune+1);
}

function delRune() {
  if( state.currentEntry[state.position.word].length == 1 ){
    delWord();
    return;
  }
  state.currentEntry[state.position.word].splice(state.position.rune,1);
  if(!currentRune()) {
    selectRune(state.position.word,state.position.rune-1);
  }
}

function selectRune(word,rune) {
  if(!state.currentEntry[word]) {
    state.currentEntry[word] = [];
  }
  if(!state.currentEntry[word][rune]) {
    state.currentEntry[word][rune] = [0,0,0];
  }
  state.position = {word, rune};
}

function delWord() {
  if( state.currentEntry.length == 1 ){
    state.currentEntry = [];
    selectRune(0,0);
    return;
  } 
  state.currentEntry.splice(state.position.word,1);
  const newWord = !state.currentEntry[state.position.word-1] ? state.position.word: state.position.word-1;
  selectRune(newWord,state.currentEntry[newWord].length);
}

function createWord() {
  if(state.currentEntry[state.position.word+1]) {
    state.currentEntry.splice(state.position.word+1,0,[]);
  }
  selectRune(state.position.word+1,0);
}

function next() {
  stateSubject$.next(JSON.parse(JSON.stringify(state)));
}

function selectLeft() {
  if(state.position.rune > 0) {
    state.position.rune = state.position.rune-1;
    return;
  }
  if(state.position.word == 0) {
    return
  }
  state.position.word = state.position.word-1;
  state.position.rune = currentWord().length-1;
}

function selectRight() {
  if(state.position.rune < currentWord().length-1) {
    state.position.rune = state.position.rune+1;
    return;
  }
  if(state.position.word == state.currentEntry.length-1) {
    return
  }
  state.position.word = state.position.word+1;
  state.position.rune = 0;
}

function clear() {
  state.currentEntry = [[[0,0,0]]];
  state.position = {
    word: 0,
    rune: 0
  }
  state.title = "";
  state.editingIndex = -1;
}

function nextRuneAction() {
  if(currentRune().some(v => v > 0)) {
    createRune();
  } else {
    delRune();
    createWord();
  }
  next();
}

function clearAction() {
  clear();
  next();
}

function createWordAction() {
  createWord();
  next();
}

function createRuneAction() {
  createRune();
  next();
}

function delRuneAction() {
  delRune();
  next();
}

function delWordAction() {
  delWord();
  next();
}

function selectRuneAction(word,rune) {
  selectRune(word,rune);
  next();
}

function pickRunePartAction(rune) {
  currentRune()[rune.typeIndex] = rune.value;
  next();
}

function selectLeftAction() {
  selectLeft();
  next();
}

function selectRightAction() {
  selectRight();
  next();
}


export {
  state,
  stateSubject$,
  currentRune,
  clearAction as clear,
  createWordAction as createWord,
  createRuneAction as createRune,
  delRuneAction as delRune,
  delWordAction as delWord,
  selectRuneAction as selectRune,
  pickRunePartAction as pickRunePart,
  nextRuneAction as nextRune,
  selectLeftAction as selectLeft,
  selectRightAction as selectRight
}