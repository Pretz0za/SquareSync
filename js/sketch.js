let boundaryCenter = [400, 400];
let boundarySideLength = 400;
let squareSideLength = 50;

let input = [
	{
		velX: 0.30803080308030806,
		velY: 0.5761316872427984,
		deltaX: 346.53465346534654,
		deltaY: 350.00000000000006,
		sideLength: 50,
	},
	{
		velX: 0.30803080308030806,
		velY: 0.5761316872427984,
		deltaX: 339.6039603960396,
		deltaY: 337.03703703703707,
		sideLength: 50,
	},
	{
		velX: 0.30803080308030806,
		velY: 1.4141414141414141,
		deltaX: 332.6732673267327,
		deltaY: 286.3636363636364,
		sideLength: 50,
	},
	{
		velX: 0.2854230377166157,
		velY: 0.4713804713804714,
		deltaX: 327.5229357798165,
		deltaY: 318.1818181818182,
		sideLength: 50,
	},
	{
		velX: 0.2854230377166157,
		velY: 0.3888888888888889,
		deltaX: 321.10091743119267,
		deltaY: 315,
		sideLength: 50,
	},
	{
		velX: 0.2854230377166157,
		velY: 0.4713804713804714,
		deltaX: 314.6788990825688,
		deltaY: 296.969696969697,
		sideLength: 50,
	},
	{
		velX: 0.2854230377166157,
		velY: 0.45751633986928103,
		deltaX: 308.25688073394497,
		deltaY: 288.235294117647,
		sideLength: 50,
	},
	{
		velX: 0.2854230377166157,
		velY: 0.4444444444444444,
		deltaX: 301.8348623853211,
		deltaY: 280,
		sideLength: 50,
	},
	{
		velX: 0.2854230377166157,
		velY: 0.37037037037037035,
		deltaX: 295.41284403669727,
		deltaY: 283.3333333333333,
		sideLength: 50,
	},
	{
		velX: 0.2802802802802803,
		velY: 0.3888888888888889,
		deltaX: 290.0900900900901,
		deltaY: 271.25,
		sideLength: 50,
	},
	{
		velX: 0.2753195673549656,
		velY: 0.2777777777777778,
		deltaX: 284.9557522123894,
		deltaY: 287.5,
		sideLength: 50,
	},
	{
		velX: 0.2529358626919603,
		velY: 0.263653483992467,
		deltaX: 284.5528455284553,
		deltaY: 284.74576271186436,
		sideLength: 50,
	},
	{
		velX: 0.23748939779474132,
		velY: 0.24691358024691357,
		deltaX: 283.206106870229,
		deltaY: 283.3333333333333,
		sideLength: 50,
	},
	{
		velX: 0.2190923317683881,
		velY: 0.22382094324540366,
		deltaX: 280.98591549295776,
		deltaY: 282.0143884892086,
		sideLength: 50,
	},
	{
		velX: 0.2190923317683881,
		velY: 0.2190923317683881,
		deltaX: 271.1267605633803,
		deltaY: 276.056338028169,
		sideLength: 50,
	},
	{
		velX: 0.21604938271604937,
		velY: 0.14957264957264957,
		deltaX: 257.63888888888886,
		deltaY: 296.15384615384613,
		sideLength: 50,
	},
	{
		velX: 0.21021021021021022,
		velY: 0.14957264957264957,
		deltaX: 255.40540540540542,
		deltaY: 286.0576923076923,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 282.6923076923077,
		deltaY: 282.6923076923077,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 269.2307692307692,
		deltaY: 269.2307692307692,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.22064617809298662,
		deltaX: 264.1826923076923,
		deltaY: 223.40425531914894,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 255.76923076923077,
		deltaY: 259.1346153846154,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.2356902356902357,
		deltaX: 242.30769230769232,
		deltaY: 180.3030303030303,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 228.84615384615384,
		deltaY: 232.21153846153845,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 215.3846153846154,
		deltaY: 215.3846153846154,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 201.92307692307693,
		deltaY: 208.65384615384616,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 185.09615384615384,
		deltaY: 195.1923076923077,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 178.3653846153846,
		deltaY: 181.73076923076923,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 171.6346153846154,
		deltaY: 175,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 164.90384615384616,
		deltaY: 168.26923076923077,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 154.80769230769232,
		deltaY: 158.17307692307693,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 148.07692307692307,
		deltaY: 151.4423076923077,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 141.34615384615384,
		deltaY: 144.71153846153845,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 131.25,
		deltaY: 137.98076923076923,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 124.51923076923077,
		deltaY: 127.88461538461539,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 117.78846153846153,
		deltaY: 121.15384615384616,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 111.0576923076923,
		deltaY: 114.42307692307692,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 100.96153846153847,
		deltaY: 104.32692307692308,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 90.86538461538461,
		deltaY: 97.59615384615385,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 84.13461538461539,
		deltaY: 87.5,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 74.03846153846153,
		deltaY: 77.40384615384616,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 67.3076923076923,
		deltaY: 70.67307692307692,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 60.57692307692308,
		deltaY: 63.94230769230769,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 50.48076923076923,
		deltaY: 57.21153846153846,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 43.75,
		deltaY: 47.11538461538461,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 33.65384615384615,
		deltaY: 40.38461538461539,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 26.923076923076923,
		deltaY: 26.923076923076923,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 20.192307692307693,
		deltaY: 20.192307692307693,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 13.461538461538462,
		deltaY: 13.461538461538462,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 3.3653846153846154,
		deltaY: 11.778846153846153,
		sideLength: 50,
	},
	{
		velX: 0.14957264957264957,
		velY: 0.14957264957264957,
		deltaX: 0,
		deltaY: 0,
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
