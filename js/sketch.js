let boundaryCenter = [400, 400];
let boundarySideLength = 800;
let squareSideLength = 50;
let colorFadeSpeed = 60;
let started = false;
let animationType = 2;
let song = null;
const HEIGHT = 800;
const WIDTH = 800;

function setUpMP3FileUpload() {
	const input = document.getElementById('mp3FileInput');

	input.addEventListener('change', () => {
		if (!input.files) return;
		const f = input.files[0];
		if (!f) return;

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
		}
	});
}

function randomHue() {
	return 360 * ((sin(PI * Math.random() - 1.5) + 1) / 2);
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

function mousePressed() {
	if (midiFile && song && !started) {
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
	background(255, 255, 255);

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
		fill(255);
		stroke(0, 0, 0);
		scale(1, -1);
		translate(0, -height);
		translate(width / 2, height / 2);
		strokeWeight(4);

		scale(0.1);

		beginShape();
		vertices.forEach((v) => {
			vertex(v.x, v.y);
		});
		endShape(CLOSE);
	}
}
