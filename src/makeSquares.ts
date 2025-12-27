import { NotePattern, Square, RGBColor } from './parseMidi';

const SMALL_SQUARE_SIDE_LENGTH = 50;
const BOUNDARY_SIDE_LENGTH = 400;
const TEMPO = 160; //95;
const PPQ = 96;
const FPS = 60;
const TICKS_PER_SECOND = (TEMPO / 60) * PPQ; // 152 ticks/second
const SECONDS_PER_TICK = 1 / TICKS_PER_SECOND; // 0.00658 seconds/tick

function ticksToSeconds(ticks: number): number {
	const quarterNotesPerSecond = TEMPO / 60;
	const secondsPerTick = 1 / (quarterNotesPerSecond * PPQ);
	return ticks * secondsPerTick;
}

export function makeSquare(
	xPattern: NotePattern,
	yPattern: NotePattern,
): Square {
	const xFreqSeconds = xPattern.frequency * SECONDS_PER_TICK;
	const yFreqSeconds = yPattern.frequency * SECONDS_PER_TICK;
	const xBeginSeconds = xPattern.begin * SECONDS_PER_TICK;
	const yBeginSeconds = yPattern.begin * SECONDS_PER_TICK;

	let velX =
		(BOUNDARY_SIDE_LENGTH - SMALL_SQUARE_SIDE_LENGTH) / (xFreqSeconds * FPS);
	let velY =
		(BOUNDARY_SIDE_LENGTH - SMALL_SQUARE_SIDE_LENGTH) / (yFreqSeconds * FPS);

	return {
		velX,
		velY,
		deltaX: velX * FPS * (xFreqSeconds - xBeginSeconds),
		deltaY: velY * FPS * (yFreqSeconds - yBeginSeconds),
		sideLength: SMALL_SQUARE_SIDE_LENGTH,
	};
}
