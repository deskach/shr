import { createStarStream, paintStars } from "./starfield";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const $starStream = createStarStream(canvas, ctx);

$starStream.subscribe(stars => paintStars(ctx, canvas, stars))
