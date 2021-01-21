// RxJS v6+
import { fromEvent, interval, noop } from 'rxjs';
import { map, scan, switchMap, takeWhile, tap } from 'rxjs/operators';
import { elem, moveDot, resetDotSize, setTimerText, updatedDot } from './dom-updater';

interface State {
  score: number;
  intrvl: number;
}

const gameState: State = {
  score: 0,
  intrvl: 500
};
const makeInterval = (val: State) => interval(val.intrvl).pipe(
  map(v => 5 - v),
  tap(setTimerText)
);
const nextState = (acc: State) => ({
  score: (acc.score += 1),
  intrvl: acc.score % 3 === 0 ? (acc.intrvl -= 50) : acc.intrvl
});
const isNotGameOver = intervalValue => intervalValue >= 0;

(() => {
  const game$ = fromEvent(elem('dot'), 'mouseover').pipe(
    tap(moveDot),
    scan<Event, State>(nextState, gameState),
    tap(state => updatedDot(state.score)),
    switchMap(makeInterval),
    tap(resetDotSize),
    takeWhile(isNotGameOver)
  );

  game$.subscribe(noop, noop, () => setTimerText('ouch!'));
})()
