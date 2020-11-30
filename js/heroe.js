import { fromEvent } from 'rxjs';
import { map, startWith } from "rxjs/operators";


export class Hero {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.HERO_Y = canvas.height - 30;
    this.createSpaceShip = this.createSpaceShip.bind(this);
    this.drawTriangle = this.drawTriangle.bind(this);
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

  drawTriangle(x, y, width, color, direction) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x - width, y);
    this.ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    this.ctx.lineTo(x + width, y);
    this.ctx.lineTo(x - width, y);
    this.ctx.fill();
  }

  paintSpaceShip(x, y) {
    this.drawTriangle(x, y, 20, '#ff0000', 'up');
  }
}
