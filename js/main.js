import { combineLatest } from 'rxjs';
import { tap, sampleTime, map, scan, distinctUntilChanged } from "rxjs/operators";
import { StarField } from "./starfield";
import { Hero } from "./heroe";
import { Enemy } from "./enemy";
import { HeroShots } from "./hero_shots";
import { testMerge } from './experiments/merge'

function renderScene([stars, spaceShip, enemies, heroShotsArray]) {
  starField.paintStars(stars);
  hero.paintSpaceShip(spaceShip.x, spaceShip.y);
  enemy.paintEnemies(enemies);
  heroShots.paintHeroShots(heroShotsArray);
}

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const GAME_SPEED = 40;
const HERO_Y = canvas.height - 30;

const starField = new StarField(canvas, ctx, GAME_SPEED);
const hero = new Hero(canvas, ctx, HERO_Y);
const enemy = new Enemy(canvas, ctx, GAME_SPEED);
const heroShots = new HeroShots(canvas, ctx)


const starStream$ = starField.createStarStream();
const spaceShip$ = hero.createSpaceShip();
const enemies$ = enemy.createEnemies();
const playerFiring$ = heroShots.createHeroShots()
const heroShots$ = combineLatest([playerFiring$, spaceShip$])
  .pipe(
    distinctUntilChanged((data1, data2) => data1[0].timestamp === data2[0].timestamp),
    scan((shotArray, [shotEvent, spaceShipXY]) => [...shotArray, spaceShipXY], []),
    map(shotArray => shotArray.filter(shot => shot.y > 0)),
  )
const game$ = combineLatest([
  starStream$,
  spaceShip$,
  enemies$,
  heroShots$
])
  .pipe(
    sampleTime(GAME_SPEED)
  )
  // .subscribe(renderScene)

// testMerge()
