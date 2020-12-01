import { fromEvent } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { drawTriangle } from "./util";


export class Hero {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.HERO_Y = canvas.height - 30;
    this.createSpaceShip = this.createSpaceShip.bind(this);
    this.paintSpaceShip = this.paintSpaceShip.bind(this);
  }

  createSpaceShip() {
    return fromEvent(this.canvas, 'mousemove')
      .pipe(
        map(event => ({
          x: event.clientX,
          y: this.HERO_Y,
        })),
        startWith({x: this.canvas.width / 2, y: this.HERO_Y})
      );
  }

  paintSpaceShip(x, y) {
    drawTriangle(this.ctx, x, y, 20, '#ff0000', 'up');
  }
}
