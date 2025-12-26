"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const midi_1 = require("@tonejs/midi");
const node_assert_1 = __importDefault(require("node:assert"));
const promises_1 = require("node:fs/promises");
let notes = [];
function createPattern(note1, note2) {
    (0, node_assert_1.default)(note1.ticks < note2.ticks);
    return { begin: note1.ticks, frequency: note2.ticks - note1.ticks };
}
// Performs a binary search through notes[left : right]. Returns Note such that
// note.ticks = target.
function binarySearchNotes(target, left, right) {
    let mid;
    while (left <= right) {
        mid = left + Math.trunc((right - left) / 2);
        if (notes[mid].ticks === target)
            return mid;
        else if (notes[mid].ticks > target)
            right = mid - 1;
        else
            left = mid + 1;
    }
    return -1;
}
// Verifies the two following properties. 1- There are no missed notes in the
// pattern, i.e. no x exists such that (begin + x * frequency) has no corresp-
// onding note played event. 2- The pattern does not conflict with any pattern
// marked in the used array.
function isValidPattern(pattern, used) {
    if (pattern.frequency == 0 || pattern.begin > pattern.frequency)
        return false;
    let currTick = pattern.begin;
    let idx = -1;
    let maxTick = notes[notes.length - 1].ticks;
    while (currTick <= maxTick) {
        idx = binarySearchNotes(currTick, idx + 1, notes.length - 1);
        if (idx == -1 || used[idx])
            return false; // not found or already used
        currTick += pattern.frequency;
    }
    return true;
}
// Flips the all values in used corresponding to pattern. Assumes pattern is
// valid. Returns false if pattern is invalid, used array will become corrupted.
function consumePattern(pattern, used) {
    let currTick = pattern.begin;
    let idx = -1;
    let maxTick = notes[notes.length - 1].ticks;
    while (currTick <= maxTick) {
        idx = binarySearchNotes(currTick, idx + 1, notes.length - 1);
        if (idx == -1)
            return false; // not found
        used[idx] = !used[idx];
        currTick += pattern.frequency;
    }
    return true;
}
function patternLength(pattern) {
    let currTick = pattern.begin;
    let idx = -1;
    let maxTick = notes[notes.length - 1].ticks;
    let count = 0;
    while (currTick <= maxTick) {
        idx = binarySearchNotes(currTick, idx + 1, notes.length - 1);
        if (idx == -1)
            return -1; // not found
        currTick += pattern.frequency;
        count++;
    }
    return count;
}
function longestPatternStartingAt(idx, used) {
    let currPattern = {
        begin: notes[idx].ticks,
        frequency: notes[notes.length - 1].ticks,
    };
    let currLength = 1;
    let output = currPattern;
    let bestLength = currLength;
    for (let i = idx + 1; i < notes.length; i++) {
        currPattern = createPattern(notes[idx], notes[i]);
        if (!isValidPattern(currPattern, used))
            continue;
        currLength = patternLength(currPattern);
        if (currLength > bestLength) {
            output = currPattern;
            bestLength = currLength;
        }
    }
    return { pattern: output, length: bestLength };
}
function longestPattern(used, firstFalse) {
    let idx = firstFalse || used.indexOf(false);
    (0, node_assert_1.default)(idx != -1);
    let output = { begin: 0, frequency: 0 };
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
function calculatePatterns(used) {
    let output = [];
    let idx;
    while ((idx = used.indexOf(false)) !== -1) {
        let pattern = longestPattern(used, idx);
        consumePattern(pattern, used);
        output.push(pattern);
    }
    return output;
}
const main = async () => {
    const file = await (0, promises_1.readFile)(process.argv[2]);
    const midi = new midi_1.Midi(file);
    notes = midi.tracks[2].notes;
    console.log(notes.length); // 42
    // midi.tracks.forEach((track) => {
    // 	console.log('track');
    // 	track.notes.forEach((note) => {
    // 		console.log(note.ticks);
    // 	});
    // });
    let used = Array(notes.length).fill(false);
    let patterns = calculatePatterns(used);
    patterns.forEach((pattern, idx) => {
        console.log('Pattern # ', idx + 1, ': ', pattern.begin, ' + ', pattern.frequency, 'x');
    });
    notes.forEach((note) => console.log(note.ticks));
};
main();
//# sourceMappingURL=parseMidi.js.map