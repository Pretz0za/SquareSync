let boundaryCenter = [400, 400];
let boundarySideLength = 400;
let squareSideLength = 50;

let input = [
	{
		velX: 0.3620689655172414,
		velY: 5.25,
		deltaX: 350,
		deltaY: 350,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 1.3125,
		deltaX: 337.93103448275866,
		deltaY: 306.25000000000006,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 325.86206896551727,
		deltaY: 325.86206896551727,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 325.86206896551727,
		deltaY: 325.86206896551727,
		sideLength: 50,
	},
	{
		velX: 0.75,
		velY: 0.3620689655172414,
		deltaX: 225,
		deltaY: 325.86206896551727,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 277.58620689655174,
		deltaY: 277.58620689655174,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 277.58620689655174,
		deltaY: 277.58620689655174,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 229.31034482758622,
		deltaY: 277.58620689655174,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 229.31034482758622,
		deltaY: 229.31034482758622,
		sideLength: 50,
	},
	{
		velX: 0.8750000000000001,
		velY: 0.3620689655172414,
		deltaX: 29.16666666666666,
		deltaY: 229.31034482758622,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.7000000000000001,
		deltaX: 205.17241379310346,
		deltaY: 81.66666666666666,
		sideLength: 50,
	},
	{
		velX: 0.7241379310344828,
		velY: 0.7241379310344828,
		deltaX: 36.206896551724164,
		deltaY: 48.275862068965544,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 181.03448275862067,
		deltaY: 187.0689655172414,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 181.03448275862067,
		deltaY: 181.03448275862067,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 181.03448275862067,
		deltaY: 181.03448275862067,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 132.75862068965517,
		deltaY: 168.96551724137933,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 132.75862068965517,
		deltaY: 132.75862068965517,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 132.75862068965517,
		deltaY: 132.75862068965517,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 108.62068965517241,
		deltaY: 108.62068965517241,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 108.62068965517241,
		deltaY: 108.62068965517241,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 84.48275862068967,
		deltaY: 96.55172413793105,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 84.48275862068967,
		deltaY: 84.48275862068967,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 84.48275862068967,
		deltaY: 84.48275862068967,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 60.34482758620692,
		deltaY: 60.34482758620692,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 48.275862068965544,
		deltaY: 60.34482758620692,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 36.206896551724164,
		deltaY: 36.206896551724164,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 24.13793103448275,
		deltaY: 30.17241379310346,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 12.068965517241375,
		deltaY: 18.103448275862082,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 12.068965517241375,
		deltaY: 12.068965517241375,
		sideLength: 50,
	},
	{
		velX: 0.3620689655172414,
		velY: 0.3620689655172414,
		deltaX: 12.068965517241375,
		deltaY: 12.068965517241375,
		sideLength: 50,
	},
];

let squares = [];

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
		console.log(velX);
	}

	draw() {
		if (
			boundaryCenter[0] +
				boundarySideLength / 2 -
				(this.x + squareSideLength / 2) <
			0
		) {
			this.velX *= -1;
			this.x =
				boundaryCenter[0] + boundarySideLength / 2 - squareSideLength / 2;
		} else if (
			boundaryCenter[0] -
				boundarySideLength / 2 -
				(this.x - squareSideLength / 2) >
			0
		) {
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
			this.velY *= -1;
			this.y =
				boundaryCenter[1] + boundarySideLength / 2 - squareSideLength / 2;
		} else if (
			boundaryCenter[1] -
				boundarySideLength / 2 -
				(this.y - squareSideLength / 2) >
			0
		) {
			this.velY *= -1;
			this.y =
				boundaryCenter[1] - boundarySideLength / 2 + squareSideLength / 2;
		}
		rect(this.x, this.y, 50, 50);
		this.x += this.velX;
		this.y += this.velY;
	}
}

function setup() {
	createCanvas(800, 800);
	background(255, 0, 0);
	rectMode(CENTER);
	fill(255);
	stroke(0, 0, 0);
	rect(400, 400, 400, 400);

	input.forEach((square) => {
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

function draw() {
	background(255, 255, 255);
	rectMode(CENTER);
	fill(255);
	stroke(0, 0, 0);
	rect(400, 400, 400, 400);

	fill(255, 255, 255);
	squares.forEach((square) => {
		square.draw();
	});
}
