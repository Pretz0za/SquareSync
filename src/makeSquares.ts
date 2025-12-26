import { NotePattern, Square, RGBColor } from './parseMidi';

const SMALL_SQUARE_SIDE_LENGTH = 50;
const BOUNDARY_SIDE_LENGTH = 400;

function makeSquare(xPattern: NotePattern, yPattern: NotePattern): Square {
	return {
		velX:
			(BOUNDARY_SIDE_LENGTH - SMALL_SQUARE_SIDE_LENGTH) / xPattern.frequency,
		velY:
			(BOUNDARY_SIDE_LENGTH - SMALL_SQUARE_SIDE_LENGTH) / yPattern.frequency,
		x:
			(xPattern.begin * (BOUNDARY_SIDE_LENGTH - SMALL_SQUARE_SIDE_LENGTH)) /
			xPattern.frequency,
		y:
			(yPattern.begin * (BOUNDARY_SIDE_LENGTH - SMALL_SQUARE_SIDE_LENGTH)) /
			yPattern.frequency,

		sideLength: SMALL_SQUARE_SIDE_LENGTH,
	};
}

console.log(
	makeSquare({ begin: 0, frequency: 192 }, { begin: 96, frequency: 384 }),
	makeSquare({ begin: 288, frequency: 768 }, { begin: 288, frequency: 768 }),
);
