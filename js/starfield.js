import { interval, range } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";

const SPEED = 40;
const STAR_NUMBER = 250;
export const createStarStream = (canvas) => range(1, STAR_NUMBER)
  .pipe(
    map(() => ({
      x: Math.round(Math.random() * canvas.width),
      y: Math.round(Math.random() * canvas.height),
      size: Math.round(Math.random() * 3)
    })),
    toArray(),
    mergeMap((starArray) => interval(SPEED)
      .pipe(
        map(() => {
          starArray.forEach(star => (star.y >= canvas.height) ? star.y = star.y - canvas.height : star.y += star.size)

          return starArray;
        })
      )
    )
  )

export function paintStars(ctx, canvas, stars) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(star => ctx.fillRect(star.x, star.y, star.size, star.size));
}
