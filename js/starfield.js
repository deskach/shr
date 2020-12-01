import { interval, range } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";

export class StarField {
  constructor(canvas, context, gameSpeed, starNumber = 250) {
    this.SPEED = gameSpeed;
    this.STAR_NUMBER = starNumber;
    this.canvas = canvas;
    this.ctx = context;
    this.createStarStream = this.createStarStream.bind(this);
    this.paintStars = this.paintStars.bind(this);
  }

  createStarStream() {
    return range(1, this.STAR_NUMBER)
      .pipe(
        map(() => ({
          x: Math.round(Math.random() * this.canvas.width),
          y: Math.round(Math.random() * this.canvas.height),
          size: Math.round(Math.random() * 3)
        })),
        toArray(),
        mergeMap((starArray) => interval(this.SPEED)
          .pipe(
            map(() => {
              starArray.forEach(star => star.y = (star.y >= this.canvas.height) ? star.y - this.canvas.height : star.y + star.size)

              return starArray;
            })
          )
        )
      )
  }

  paintStars(stars) {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    stars.forEach(star => this.ctx.fillRect(star.x, star.y, star.size, star.size));
  }

}
