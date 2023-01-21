import { fromEvent, map } from 'rxjs';
import * as editor from './editor.js';

const input$ = fromEvent(window, 'keydown')
  .pipe(
    map(e => `${e.ctrlKey ? 'Ctrl-' : ''}${e.key}`)
  );

function start() {
  input$.subscribe(k => keyPress(k));
}

function keyPress(key) {
  if(key==' ') {
    editor.nextRune();
    return;
  }
  if(key=='Backspace') {
    editor.delRune();
    return;
  }
  if(key.match(/^[a-x]$/)) {
    const offset = 96;
    const value = key.charCodeAt(0)-offset;
    editor.pickRunePart({
      typeIndex: 0,
      value
    })
  }

  if(key.match(/^[A-R]$/)){
    const offset = 64;
    const value = key.charCodeAt(0)-offset;
    editor.pickRunePart({
      typeIndex: 1,
      value
    })  
    return;
  }
  if(key=='z') {
    editor.pickRunePart({
      typeIndex: 0,
      value: 0
    })  
    return;
  }
  if(key=='Z') {
    editor.pickRunePart({
      typeIndex: 1,
      value: 0
    })  
    return;
  }
  if(key=='.') {
    editor.pickRunePart({
      typeIndex: 2,
      value: editor.currentRune()[2] ? 0 : 1
    })  
    return;
  }
  if(key=='ArrowLeft') {
    editor.selectLeft();
    return;
  }
  if(key=='ArrowRight') {
    editor.selectRight();
    return;
  }
}

export {
  start,
  input$
}
