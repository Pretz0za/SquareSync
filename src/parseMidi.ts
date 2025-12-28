declare const Midi: any;
let midiFile: ArrayBuffer | null = null;
let mp3File: File | null = null;
let notes: any[] = [];
let output: SquareType[] = [];
let trackTempo = -1;
let trackPPQ = -1;

type SquareType = {
	sideLength: number;
	deltaX: number;
	deltaY: number;
	velX: number;
	velY: number;
};

type NotePattern = {
	begin: number;
	frequency: number;
};

function setUpMidiFileUpload() {
	const input = document.getElementById('midiFileInput') as HTMLInputElement;

	input.addEventListener('change', async () => {
		const f = input.files?.[0];
		if (!f) return;
		midiFile = await f.arrayBuffer();
		main();
	});
}

// Knuth Shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: any[]) {
	let currentIndex = array.length;

	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
}

function createPattern(note1: any, note2: any): NotePattern {
	return { begin: note1.ticks, frequency: note2.ticks - note1.ticks };
}

// Performs a binary search through notes[left : right]. Returns Note such that
// note.ticks = target.
function binarySearchNotes(
	target: number,
	left: number,
	right: number,
): number {
	let mid: number, result: number | undefined;
	while (left <= right) {
		mid = left + Math.trunc((right - left) / 2);

		if (notes[mid]!.ticks === target) {
			result = mid;
			right = mid - 1;
		} else if (notes[mid]!.ticks > target) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return result ?? -1;
}

// Verifies the two following properties. 1- There are no missed notes in the
// pattern, i.e. no x exists such that (begin + x * frequency) has no corresp-
// onding note played event. 2- The pattern does not conflict with any pattern
// marked in the used array.
function isValidPattern(pattern: NotePattern, used: boolean[]): boolean {
	if (pattern.frequency == 0 || pattern.begin > pattern.frequency) return false;
	let currTick = pattern.begin;
	let idx = -1;
	let maxTick = notes[notes.length - 1]!.ticks;

	while (currTick <= maxTick) {
		idx = binarySearchNotes(currTick, idx + 1, notes.length - 1);
		if (idx == -1 || used[idx]) return false; // not found or already used
		currTick += pattern.frequency;
	}
	return true;
}

// Flips the all values in used corresponding to pattern. Assumes pattern is
// valid. Returns false if pattern is invalid, used array will become corrupted.
function consumePattern(pattern: NotePattern, used: boolean[]) {
	let currTick = pattern.begin;
	let idx = -1;
	let maxTick = notes[notes.length - 1]!.ticks;

	while (currTick <= maxTick) {
		idx = binarySearchNotes(currTick, idx + 1, notes.length - 1);
		if (idx == -1) return false; // not found
		while (used[idx]) idx++;
		used[idx] = true;
		currTick += pattern.frequency;
	}

	return true;
}

// Assumes the pattern is valid
function patternLength(pattern: NotePattern): number {
	let currTick = pattern.begin;
	let maxTick = notes[notes.length - 1]!.ticks;
	let count = 0;

	while (currTick <= maxTick) {
		currTick += pattern.frequency;
		count++;
	}

	return count;
}

function longestPatternStartingAt(
	idx: number,
	used: boolean[],
): { pattern: NotePattern; length: number } {
	let currPattern: NotePattern = {
		begin: notes[idx]!.ticks,
		frequency: notes[notes.length - 1]!.ticks,
	};
	let currLength = 1;
	let output = currPattern;
	let bestLength = currLength;

	for (let i = idx + 1; i < notes.length; i++) {
		currPattern = createPattern(notes[idx]!, notes[i]!);
		if (!isValidPattern(currPattern, used)) continue;
		currLength = patternLength(currPattern);
		if (currLength > bestLength) {
			output = currPattern;
			bestLength = currLength;
		}
	}

	return { pattern: output, length: bestLength };
}

function longestPattern(used: boolean[], firstFalse?: number): NotePattern {
	let idx = firstFalse ?? used.indexOf(false);
	let output: NotePattern = { begin: 0, frequency: 0 };
	let bestLength = 0;

	for (; idx < notes.length; idx++) {
		let { pattern, length } = longestPatternStartingAt(idx, used);
		if (length > bestLength) {
			output = pattern;
			bestLength = length;
		}
	}

	return output;
}

function calculatePatterns(used: boolean[]): NotePattern[] {
	let output: NotePattern[] = [];
	let idx: number;
	while ((idx = used.indexOf(false)) !== -1) {
		//let pattern = longestPatternStartingAt(idx, used).pattern;
		let pattern = longestPattern(used, idx);
		consumePattern(pattern, used);
		output.push(pattern);
	}
	return output;
}

const main = () => {
	const midi = new Midi(midiFile);
	trackTempo = midi.header.tempos[0]?.bpm || 120; // BPM
	trackPPQ = midi.header.ppq; // Pulses (ticks) per quarter note
	midi.tracks.forEach((track) => {
		if (track.notes.length > 0) notes = track.notes;
	});
	let used: boolean[] = Array(notes.length).fill(false);
	let patterns = calculatePatterns(used);
	shuffle(patterns);

	for (let i = 1; i < patterns.length; i += 2) {
		output.push(makeSquare(patterns[i]!, patterns[i - 1]!));
	}

	if (patterns.length % 2 === 1) {
		output.push(
			makeSquare(
				patterns[patterns.length - 1]!,
				patterns[patterns.length - 1]!,
			),
		);
	}
};
