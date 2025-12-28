"use strict";
// Given an array of note time deltas, generate collision coordinates and vertex array from that
let velocity = [4, 4]; // pixels/tick, we use MIDI track info to get pixels/frame velocity
let vertices = [];
function calculateTimeDeltas(times) {
    let ts = 0;
    let output = [];
    times.forEach((time) => {
        output.push(time - ts);
        ts = time;
    });
    return output;
}
// Returns the points in collision order. timeDelta[i] is is how many ticks from note_on[i-1] to note_on[i]
function calculateCollisionPoints(timeDeltas) {
    let lastPoint = { x: 0, y: 0 };
    let output = [];
    let direction = 1;
    for (let i = 0; i < timeDeltas.length; i++) {
        let point = {
            x: lastPoint.x + direction * velocity[0] * timeDeltas[i],
            y: lastPoint.y + velocity[1] * timeDeltas[i],
        };
        output.push(point);
        lastPoint = point;
        direction *= -1;
    }
    return output;
}
// Returns the vertices in drawing order. Right side bottom to top, the left side top to bottom.
function calculateMapVertices(collisions) {
    let output = [];
    for (let i = 0; i < collisions.length; i += 2) {
        // vertex under collision
        if (i === 0) {
            output.push({ x: collisions[i].x, y: 0 });
        }
        else {
            output.push({ x: collisions[i].x, y: collisions[i - 1].y });
        }
        // vertex above collision
        if (i + 1 < collisions.length) {
            output.push({ x: collisions[i].x, y: collisions[i + 1].y });
        }
        else {
            output.push(collisions[i]);
        }
    }
    let lastOdd = collisions.length - 1;
    if (!(lastOdd % 2)) {
        lastOdd--;
    }
    for (let i = lastOdd; i >= 0; i -= 2) {
        // vertex above collision
        if (i + 1 < collisions.length) {
            output.push({ x: collisions[i].x, y: collisions[i + 1].y });
        }
        else {
            output.push(collisions[i]);
        }
        // vertex under collision
        output.push({ x: collisions[i].x, y: collisions[i - 1].y });
    }
    console.log('hello');
    if (output[output.length - 1].y != 0) {
        console.log('hello');
        output.push({
            x: output[output.length - 1].x,
            y: 0,
        });
    }
    return output;
}
function secondAnimationMain() {
    var _a;
    const midi = new Midi(midiFile);
    trackTempo = ((_a = midi.header.tempos[0]) === null || _a === void 0 ? void 0 : _a.bpm) || 120; // BPM
    trackPPQ = midi.header.ppq; // Pulses (ticks) per quarter note
    midi.tracks.forEach((track) => {
        if (track.notes.length > 0)
            notes = track.notes;
    });
    console.log('notes:', notes);
    let times = notes.map((note) => note.ticks);
    times = [...new Set(times)];
    console.log('times:', times);
    let deltas = calculateTimeDeltas(times);
    console.log('deltas', deltas);
    let collisions = calculateCollisionPoints(deltas);
    console.log('collisions', collisions);
    vertices = calculateMapVertices(collisions);
    console.log('vertices', vertices);
}
//# sourceMappingURL=createMap.js.map