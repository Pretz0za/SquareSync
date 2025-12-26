let squares = [
	{
		velX: 1.8229166666666667,
		velY: 0.9114583333333334,
		x: 0,
		y: 87.5,
		sideLength: 50,
	},
	{
		velX: 0.4557291666666667,
		velY: 0.4557291666666667,
		x: 131.25,
		y: 131.25,
		sideLength: 50,
	},
];
function setup() {
	createCanvas(800, 800);
	background(255, 0, 0);
	rectMode(CENTER);
	fill(150);
	stroke(0, 0, 0);
	rect(400, 400, 400, 400);
}

function draw() {
	background(255, 0, 0);
	rectMode(CENTER);
	fill(150);
	stroke(0, 0, 0);
	rect(400, 400, 400, 400);

	fill(0, 255, 0);
	squares.forEach((square) => {
		if (abs(225 + square.x - 600) < 10) square.velX *= -1;
		rect(225 + square.x, 225 + square.y, 50, 50);
		square.x += square.velX;
		square.y += square.velY;
	});
}
