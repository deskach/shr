import { EMPTY, fromEvent, interval, merge } from 'rxjs';
import { filter, mapTo, scan, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';

const countdownSeconds = 10;
const interval$ = interval(1000).pipe(mapTo(-1));

const keypress$ = fromEvent(document, 'keydown').pipe(
  filter(evt => evt.code === 'Space'),
  scan((val) => !val, true)
)

const timer$ = keypress$
  .pipe(
    startWith(true),
    // if timer is paused return empty observable
    switchMap(val => (val ? interval$ : EMPTY)),
    scan((acc, curr) => (curr ? curr + acc : acc), countdownSeconds),
    takeWhile(v => v >= 0)
  )

export const testEmpty = () => timer$.subscribe(console.log)
