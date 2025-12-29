// Possible third animation type:
// https://www.instagram.com/p/CgpAX6aP_0d/
// reference: https://www.cerritos.edu/dford/SitePages/Math_70_F13/CircleDefinitionsandTheorems.pdf#:~:text=congruent.%20Chord%20Arcs%20Theorem%20If%20two%20chords,congruent%2C%20then%20their%20intercepted%20arcs%20are%20congruent.
// Star Polygons. Connect every kth vertex of an inscribed regular n-gon. They have the following properties:
// 1- All chords have equal length.
// 2- intersecting chords. This leads to much more interesting visualizations.
// 3- Cyclical. One full cycle is

let frozen = false;

let boundaryCenter = [400, 400];
let boundingCircleRadius = 400;
let circleRadius = 50;
let boundarySideLength = 800;
let squareSideLength = 50;
let colorFadeSpeed = 60;
let started = false;
let animationType = 3;
let song = null;
let rectPos = [0, 0];
let collisionIdx = 0;
let lastHit = -1000;
let opacity = 0;
let color = 0;
const HEIGHT = 800;
const WIDTH = 800;
const FPS = 30;
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
		} else if (animationType == 2) {
			secondAnimationMain();
			rectPos = [0, 0];
			started = false;
			for (let i = 0; i < collisions.length; i++) {
				if (collisions[i].y != 0) {
					collisionIdx = i;
					break;
				}
			}
		} else {
			thirdAnimationMain();
		}
	});
}

function randomHue() {
	return lerp(0, 360, Math.random());
	//return 360 * ((sin(PI * Math.random() - 1.5) + 1) / 2);
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
let circles = [];

function setup() {
	frameRate(FPS);

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
	} else if (animationType == 2) {
		background(3, 255, 237);
	} else {
		background(255, 255, 255);
		fill(255);
		circle(boundaryCenter[0], boundaryCenter[1], 2 * boundingCircleRadius);
	}

	squares = [];
	circles = [];
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
	} else if (animationType === 2) {
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
		colorMode(HSB, 255);
		fill(color, 255, 255, opacity);
		rect(rectPos[0], rectPos[1], 50, 50);
		colorMode(RGB);
	} else {
		if (!frozen) {
			background(255, 255, 255);
			fill(255);
			circle(boundaryCenter[0], boundaryCenter[1], 2 * boundingCircleRadius);

			if (started) {
				if (circles.length === 0) {
					circleOutput.forEach((circle) => circles.push(new Circle(circle)));
					// circles.push(
					// 	new Circle({
					// 		lastVertex: 0,
					// 		vertexCount: 2,
					// 		k: 1,
					// 		lerpCoefficient: 0.5,
					// 		lerpIncrement: 0.01,
					// 	}),
					// );
				}
				colorMode(HSB, 255);
				circles.forEach((circle) => {
					circle.draw();
				});
				colorMode(RGB);
				//frozen = true;
			}
		}
	}
}
