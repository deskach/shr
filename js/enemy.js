import { interval } from 'rxjs';
import { mergeMap, scan, map, tap, toArray } from "rxjs/operators";
import { drawTriangle } from "./util";

export class Enemy {
  constructor(canvas, context, gameSpeed) {
    this.canvas = canvas;
    this.ctx = context;
    this.GAME_SPEED = gameSpeed;
    this.ENEMY_FREQ = 1500;
    this.createEnemies = this.createEnemies.bind(this);
    this.createEnemyCoords = this.createEnemyCoords.bind(this);
  }

  createEnemyCoords() {
    return {
      x: Math.round(Math.random() * this.canvas.width),
      y: -15
    }
  }

  createEnemies() {
    return interval(this.ENEMY_FREQ)
      .pipe(
        scan(enemyArray => {
          return [...enemyArray, this.createEnemyCoords()].filter(enemy => enemy.y < this.canvas.height)
        }, []),
      )
  }

  paintEnemies(enemyArray) {
    enemyArray.forEach(enemy => {
      enemy.x += getRandomInit(-15, 15)
      enemy.y += 5;
      // TODO find a way to move this ^ into createEnemies method
      drawTriangle(this.ctx, enemy.x, enemy.y, 20, '#00ff00', 'down')
    })
  }
}

const getRandomInit = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
