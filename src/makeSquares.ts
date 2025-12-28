declare const boundarySideLength: number;
declare const squareSideLength: number;

function makeSquare(xPattern: NotePattern, yPattern: NotePattern): SquareType {
	const FPS = 60;
	const TICKS_PER_SECOND = (trackTempo / 60) * trackPPQ;
	const SECONDS_PER_TICK = 1 / TICKS_PER_SECOND;

	const xFreqSeconds = xPattern.frequency * SECONDS_PER_TICK;
	const yFreqSeconds = yPattern.frequency * SECONDS_PER_TICK;
	const xBeginSeconds = xPattern.begin * SECONDS_PER_TICK;
	const yBeginSeconds = yPattern.begin * SECONDS_PER_TICK;

	let velX = (boundarySideLength - squareSideLength) / (xFreqSeconds * FPS);
	let velY = (boundarySideLength - squareSideLength) / (yFreqSeconds * FPS);

	return {
		velX,
		velY,
		deltaX: velX * FPS * (xFreqSeconds - xBeginSeconds),
		deltaY: velY * FPS * (yFreqSeconds - yBeginSeconds),
		sideLength: squareSideLength,
	};
}
