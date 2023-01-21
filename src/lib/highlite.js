import { Subject } from 'rxjs';

const highliteSubject$ = new Subject();

function highlite(rune) {
  highliteSubject$.next(rune);
}

function unhighlite() {
  highliteSubject$.next([0,0,0]);
}

export {
  highlite,
  unhighlite,
  highliteSubject$
}
