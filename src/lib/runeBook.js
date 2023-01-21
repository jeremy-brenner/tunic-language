import { Subject } from 'rxjs';
const md5 = require('md5');

const booksSubject$ = new Subject();
const indexChangeSubject$ = new Subject();

const example = [{
  title: "Example Book",
  entries: [{ 
    title:"Example",
    words:[[[9,3,1],[17,1,0],[1,0,0],[4,6,0],[24,0,0]],[[21,8,0],[2,0,0],[17,0,0]]],
    md5sum: ""
  }]
}];

let currentBook = 0;
let books = [];

function load() {
  books = JSON.parse(localStorage.getItem('books')) || example;
  next();
}

function saveEntry(i,entry) {
  const md5sum = md5(JSON.stringify({title: entry.title, words: entry.words}));
  const hashedEntry = {title: entry.title, words: entry.words, md5sum};
  if(i == -1) {
    books[currentBook].entries = [...books[currentBook].entries, hashedEntry];
  } else {
    books[currentBook].entries[i] = hashedEntry;
  }
  store();
}

function newBook(title) {
  books.push({
    title,
    entries: []
  });
  store();
}

function selectBook(i) {
  currentBook = i;
  next();
}

function moveUp(i) {
  if(i == 0) {
    return;
  }
  const moving = books[currentBook].entries[i];
  books[currentBook].entries[i] = books[currentBook].entries[i-1];
  books[currentBook].entries[i-1] = moving;
  indexChangeSubject$.next({[i]: i-1, [i-1]: i});
  store();
}

function moveDown(i) {
  if(i == books[currentBook].entries.length - 1) {
    return;
  }
  const moving = books[currentBook].entries[i];
  books[currentBook].entries[i] = books[currentBook].entries[i+1];
  books[currentBook].entries[i+1] = moving;
  indexChangeSubject$.next({[i]: i+1, [i+1]: i});
  store();
}

function deleteEntry(i) {
  books[currentBook].entries.splice(i,1);
  indexChangeSubject$.next({[i]: -1});
  store();
}

function store() {
  localStorage.setItem('books', JSON.stringify(books));
  next();
}

function next() {
  booksSubject$.next({
    currentBook,
    bookTitles: books.map(b => b.title),
    entries: JSON.parse(JSON.stringify(books[currentBook].entries)),
    export: JSON.stringify(books)
  }); 
}

function importBooks(booksJSON) {
  books = JSON.parse(booksJSON);
  store();
}

export {
  load,
  moveUp,
  moveDown,
  deleteEntry,
  saveEntry,
  newBook,
  selectBook,
  importBooks,
  booksSubject$,
  indexChangeSubject$
}