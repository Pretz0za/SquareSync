import { Midi } from '@tonejs/midi';
import { Note } from '@tonejs/midi/dist/Note';
import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { makeSquare } from './makeSquares';

export type RGBColor = {
	red: number;
	green: number;
	blue: number;
};

export type Square = {
	sideLength: number;
	deltaX: number;
	deltaY: number;
	velX: number;
	velY: number;
};

export type NotePattern = {
	begin: number;
	frequency: number;
};

let notes: Note[] = [];

function createPattern(note1: Note, note2: Note): NotePattern {
	assert(note1.ticks <= note2.ticks);
	return { begin: note1.ticks, frequency: note2.ticks - note1.ticks };
}

// Performs a binary search through notes[left : right]. Returns Note such that
// note.ticks = target.
function binarySearchNotes(
	target: number,
	left: number,
	right: number,
): number {
	let mid, result;
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
	let idx = firstFalse || used.indexOf(false);
	assert(idx != -1);
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
	let idx;
	while ((idx = used.indexOf(false)) !== -1) {
		let pattern = longestPatternStartingAt(idx, used).pattern;
		//let pattern = longestPattern(used, idx);
		assert(consumePattern(pattern, used));
		output.push(pattern);
	}
	return output;
}

const main = async () => {
	const file = await readFile(process.argv[2]!);
	const midi = new Midi(file);
	const tempo = midi.header.tempos[0]?.bpm || 120; // BPM
	const ppq = midi.header.ppq; // Pulses (ticks) per quarter note
	notes = midi.tracks[1]!.notes;
	console.log(tempo, ppq); // 42
	let used: boolean[] = Array(notes.length).fill(false);
	let patterns = calculatePatterns(used);
	let squares: Square[] = [];

	console.log(patterns);

	for (let i = 1; i < patterns.length; i += 2) {
		console.log(i);
		squares.push(makeSquare(patterns[i]!, patterns[i - 1]!));
	}

	if (patterns.length % 2 === 1) {
		console.log('length', patterns.length, patterns[patterns.length - 1]);
		squares.push(
			makeSquare(
				patterns[patterns.length - 1]!,
				patterns[patterns.length - 1]!,
			),
		);
	}

	squares.forEach((square) => console.log(square, ','));
};

main();
