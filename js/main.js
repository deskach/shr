import { combineLatest } from 'rxjs';
import { StarField } from "./starfield";
import { Hero } from "./heroe";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const starField = new StarField(canvas, ctx);
const hero = new Hero(canvas, ctx);

const starStream$ = starField.createStarStream();
const spaceShip$ = hero.createSpaceShip();
const game$ = combineLatest([starStream$, spaceShip$])

function renderScene([stars, spaceShip]) {
  starField.paintStars(stars);
  hero.paintSpaceShip(spaceShip.x, spaceShip.y);
}

game$.subscribe(renderScene);
