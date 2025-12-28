let boundaryCenter = [400, 400];
let boundarySideLength = 800;
let squareSideLength = 50;
let colorFadeSpeed = 60;
let started = false;
let animationType = 2;
let song = null;
let rectPos = [0, 0];
let collisionIdx = 0;
let lastHit = -1000;
let opacity = 0;
let color = 0;
const HEIGHT = 800;
const WIDTH = 800;
const FPS = 60;
const SUBSTEPS = 120;

function setUpMP3FileUpload() {
	const input = document.getElementById('mp3FileInput');

	input.addEventListener('change', () => {
		if (!input.files) return;
		const f = input.files[0];
		if (!f) return;

		started = false;

		const url = URL.createObjectURL(f);

		console.log('mp3 file uploaded loading sound');

		loadSound(
			url,
			(s) => {
				console.log('sound loaded');
				song = s;
			},
			(err) => {
				console.error(err);
			},
		);
	});
}

function setUpMidiFileUpload() {
	const input = document.getElementById('midiFileInput');

	input.addEventListener('change', async () => {
		const f = input.files?.[0];
		if (!f) return;
		midiFile = await f.arrayBuffer();
		if (animationType == 1) {
			firstAnimationMain();
		} else {
			secondAnimationMain();
			rectPos = [0, 0];
			started = false;
			for (let i = 0; i < collisions.length; i++) {
				if (collisions[i].y != 0) {
					collisionIdx = i;
					break;
				}
			}
			console.log('first collision:', collisions[collisionIdx]);
		}
	});
}

function randomHue() {
	return lerp(0, 360, Math.random());
	//return 360 * ((sin(PI * Math.random() - 1.5) + 1) / 2);
}

class Square {
	constructor(velX, velY, deltaX, deltaY, directionX, directionY) {
		this.velX = velX * directionX;
		this.velY = velY * directionY;
		this.x =
			boundaryCenter[0] -
			(boundarySideLength / 2) * directionX +
			(deltaX + squareSideLength / 2) * directionX;
		this.y =
			boundaryCenter[1] -
			(boundarySideLength / 2) * directionY +
			(deltaY + squareSideLength / 2) * directionY;
		this.lastHit = -1000;
		this.opacity = 0;
		this.color = 0;
	}

	draw() {
		if (
			boundaryCenter[0] +
				boundarySideLength / 2 -
				(this.x + squareSideLength / 2) <
			0
		) {
			this.lastHit = frameCount;
			this.color = randomHue();
			this.velX *= -1;
			this.x =
				boundaryCenter[0] + boundarySideLength / 2 - squareSideLength / 2;
		} else if (
			boundaryCenter[0] -
				boundarySideLength / 2 -
				(this.x - squareSideLength / 2) >
			0
		) {
			this.lastHit = frameCount;
			this.color = randomHue();
			this.velX *= -1;
			this.x =
				boundaryCenter[0] - boundarySideLength / 2 + squareSideLength / 2;
		}

		if (
			boundaryCenter[1] +
				boundarySideLength / 2 -
				(this.y + squareSideLength / 2) <
			0
		) {
			this.lastHit = frameCount;
			this.color = randomHue();
			this.velY *= -1;
			this.y =
				boundaryCenter[1] + boundarySideLength / 2 - squareSideLength / 2;
		} else if (
			boundaryCenter[1] -
				boundarySideLength / 2 -
				(this.y - squareSideLength / 2) >
			0
		) {
			this.lastHit = frameCount;
			this.color = randomHue();
			this.velY *= -1;
			this.y =
				boundaryCenter[1] - boundarySideLength / 2 + squareSideLength / 2;
		}
		this.opacity = max(
			map(frameCount, this.lastHit, this.lastHit + colorFadeSpeed, 255, 0),
			0,
		);
		fill(this.color, 255, 255, this.opacity);
		rect(this.x, this.y, squareSideLength, squareSideLength);
		this.x += this.velX;
		this.y += this.velY;
	}
}

function preload() {}

function keyPressed() {
	if (keyCode === ENTER && midiFile && song && !started) {
		started = true;
		userStartAudio();
		song.play();
	}
}

let squares = [];

function setup() {
	setUpMP3FileUpload();
	setUpMidiFileUpload();

	createCanvas(WIDTH, HEIGHT);
	background(255, 0, 0);

	if (animationType == 1) {
		rectMode(CENTER);
		fill(255);
		stroke(0, 0, 0);
		rect(
			boundaryCenter[0],
			boundaryCenter[1],
			boundarySideLength,
			boundarySideLength,
		);
	} else {
		background(3, 255, 237);
	}

	squares = [];
}

function draw() {
	if (animationType == 1) {
		rectMode(CENTER);
		fill(255);
		stroke(0, 0, 0);
		rect(
			boundaryCenter[0],
			boundaryCenter[1],
			boundarySideLength,
			boundarySideLength,
		);

		if (started) {
			if (squares.length === 0) {
				output.forEach((square) => {
					squares.push(
						new Square(
							square.velX,
							square.velY,
							square.deltaX,
							square.deltaY,
							Math.random() < 0.5 ? 1 : -1,
							Math.random() < 0.5 ? 1 : -1,
						),
					);
				});
			}

			colorMode(HSB, 255);
			squares.forEach((square) => {
				square.draw();
			});
			colorMode(RGB);
		}
	} else {
		background(3, 255, 237);
		fill(255);
		stroke(0, 0, 0);
		scale(1, -1);
		translate(0, -height);
		translate(width / 2, height / 2);
		strokeWeight(4);

		scale(0.5);

		translate(-rectPos[0], -rectPos[1]);
		beginShape();
		vertices.forEach((v) => {
			vertex(v.x, v.y);
		});
		endShape(CLOSE);

		if (started && collisionIdx < collisions.length) {
			for (let i = 0; i < SUBSTEPS; i++) {
				rectPos[0] -= perFrameVel[0] / SUBSTEPS;
				rectPos[1] += perFrameVel[1] / SUBSTEPS;

				if (collisions[collisionIdx].y - rectPos[1] < 0.0) {
					collisionIdx++;
					perFrameVel[0] *= -1;
					lastHit = frameCount;
					if (opacity < 100) color = randomHue();
					if (collisionIdx == collisions.length) break;
				}
			}
		}

		opacity = max(
			map(frameCount, lastHit, lastHit + colorFadeSpeed, 255, 0),
			0,
		);
		console.log(lastHit, opacity);
		colorMode(HSB, 255);
		fill(color, 255, 255, opacity);
		rect(rectPos[0], rectPos[1], 50, 50);
		colorMode(RGB);
	}
}
