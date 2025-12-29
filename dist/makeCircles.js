"use strict";
let circleOutput = [];
const gcd = function (a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
};
function makeCircle(pattern) {
    const FPS = 30;
    const TICKS_PER_SECOND = (trackTempo / 60) * trackPPQ;
    const TICKS_PER_FRAME = TICKS_PER_SECOND / FPS;
    const FRAMES_PER_TICK = 1 / TICKS_PER_FRAME;
    const count = patternLength(pattern);
    let n = 0;
    let k = 0;
    if (count <= 6) {
        let rng = Math.random();
        if (rng < 1 / 3) {
            n = 2;
            k = 1;
        }
        else if (rng < 2 / 3) {
            n = 3;
            k = 1;
        }
        else {
            n = 3;
            k = 2;
        }
    }
    else if (count <= 16) {
        n = count;
        let delta = 1;
        k = Math.floor(n / 2);
        while (gcd(n, k + delta) > 1 && gcd(n, k - delta) > 1) {
            delta++;
        }
        if (gcd(n, k + delta) === 1)
            k += delta;
        else
            k -= delta;
    }
    else {
        n = 3 + (count % 3);
        let delta = 1;
        k = Math.floor(n / 2);
        while (gcd(n, k + delta) > 1 && gcd(n, k - delta) > 1) {
            delta++;
        }
        if (gcd(n, k + delta) === 1)
            k += delta;
        else
            k -= delta;
    }
    //console.log(`new circle. n: ${n}, k: ${k}. Should collide: ${count} times`);
    let theta = ((2 * Math.PI) / n) * k;
    if (theta > Math.PI)
        theta = 2 * Math.PI - theta;
    let sideLength = Math.sqrt(2 *
        Math.pow(boundingCircleRadius - circleRadius, 2) *
        (1 - Math.cos(theta)));
    let lerpIncrement = 1 / (pattern.frequency * FRAMES_PER_TICK);
    return {
        lastVertex: Math.floor(Math.random() * n),
        vertexCount: n,
        k,
        lerpCoefficient: 
        //	circleRadius / sideLength +
        (pattern.frequency - pattern.begin) * FRAMES_PER_TICK * lerpIncrement,
        lerpIncrement,
    };
}
const thirdAnimationMain = () => {
    var _a;
    const midi = new Midi(midiFile);
    trackTempo = ((_a = midi.header.tempos[0]) === null || _a === void 0 ? void 0 : _a.bpm) || 120; // BPM
    trackPPQ = midi.header.ppq;
    midi.tracks.forEach((track) => {
        if (track.notes.length > 0)
            notes = track.notes;
    });
    let lastTick = -1;
    notes = notes.filter((note) => {
        if (note.ticks === lastTick)
            return false;
        else {
            lastTick = note.ticks;
            return true;
        }
    });
    let used = Array(notes.length).fill(false);
    let patterns = calculatePatterns(used);
    console.log('pattern count:', patterns.length);
    for (let i = 0; i < patterns.length; i += 1) {
        circleOutput.push(makeCircle(patterns[i]));
    }
};
class Circle {
    constructor(circle) {
        this.lastVertex = circle.lastVertex;
        this.lerpCoefficient = circle.lerpCoefficient;
        this.lerpIncrement = circle.lerpIncrement;
        this.n = circle.vertexCount;
        this.k = circle.k;
        this.vertices = this.getVertices();
        let theta = ((2 * Math.PI) / this.n) * this.k;
        if (theta > Math.PI)
            theta = 2 * Math.PI - theta;
        this.sideLength = Math.sqrt(2 * boundingCircleRadius * boundingCircleRadius * (1 - Math.cos(theta)));
        this.lastHit = -1000;
        this.color = 0;
        this.opacity = 0;
    }
    getVertices() {
        let output = [];
        let startTheta = Math.random() * 2 * Math.PI;
        for (let theta = startTheta; theta < startTheta + 2 * Math.PI; theta += (2 * Math.PI) / this.n) {
            output.push([
                boundaryCenter[0] +
                    (boundingCircleRadius - circleRadius) * Math.cos(theta),
                boundaryCenter[1] +
                    (boundingCircleRadius - circleRadius) * Math.sin(theta),
            ]);
        }
        return output;
    }
    draw() {
        let nextVertex = (this.lastVertex + this.k) % this.n;
        let pos = [
            lerp(this.vertices[this.lastVertex][0], this.vertices[nextVertex][0], this.lerpCoefficient),
            lerp(this.vertices[this.lastVertex][1], this.vertices[nextVertex][1], this.lerpCoefficient),
        ];
        this.lerpCoefficient += this.lerpIncrement;
        if (this.lerpCoefficient >= 1) {
            this.lerpCoefficient = 0;
            this.lastVertex = nextVertex;
            nextVertex = (this.lastVertex + this.k) % this.n;
            this.lastHit = frameCount;
            this.color = randomHue();
        }
        this.opacity = max(map(frameCount, this.lastHit, this.lastHit + colorFadeSpeed, 255, 0), 0);
        fill(this.color, 255, 255, this.opacity);
        circle(pos[0], pos[1], 2 * circleRadius);
    }
}
//# sourceMappingURL=makeCircles.js.map