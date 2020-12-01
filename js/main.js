import { combineLatest } from 'rxjs';
import { sampleTime } from "rxjs/operators";
import { StarField } from "./starfield";
import { Hero } from "./heroe";
import { Enemy } from "./enemy";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const GAME_SPEED = 40;

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const starField = new StarField(canvas, ctx, GAME_SPEED);
const hero = new Hero(canvas, ctx);
const enemy = new Enemy(canvas, ctx, GAME_SPEED);

const starStream$ = starField.createStarStream();
const spaceShip$ = hero.createSpaceShip();
const enemies$ = enemy.createEnemies();
const game$ = combineLatest([starStream$, spaceShip$, enemies$])
  .pipe(
    sampleTime(GAME_SPEED)
  )

game$.subscribe(renderScene);

function renderScene([stars, spaceShip, enemies]) {
  starField.paintStars(stars);
  hero.paintSpaceShip(spaceShip.x, spaceShip.y);
  enemy.paintEnemies(enemies)
}
