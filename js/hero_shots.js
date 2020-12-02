import { fromEvent, merge } from 'rxjs';
import { tap, map, startWith, filter, sampleTime, timestamp } from "rxjs/operators";
import { drawTriangle } from "./util";

export class HeroShots {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.SHOOTING_DELAY = 200;
    this.createHeroShots = this.createHeroShots.bind(this);
    this.paintHeroShots = this.paintHeroShots.bind(this);
  }

  createHeroShots() {
    return merge(
      fromEvent(this.canvas, 'click'),
      fromEvent(document, 'keydown').pipe(filter(evt => evt.code === 'Space'))
    ).pipe(
      startWith({}),
      sampleTime(this.SHOOTING_DELAY),
      timestamp()
    )
  }

  paintHeroShots(heroShots = []) {
    if (heroShots && heroShots.length) {
      heroShots.forEach(shot => {
        shot.y -= 15;

        drawTriangle(this.ctx, shot.x, shot.y, 5, '#ffff00', 'up')
      })
    }
  }
}
