"use strict";
function makeSquare(xPattern, yPattern) {
    const FPS = 30;
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
        this.lastHit = -1000;
        this.opacity = 0;
        this.color = 0;
    }
    draw() {
        if (boundaryCenter[0] +
            boundarySideLength / 2 -
            (this.x + squareSideLength / 2) <
            0) {
            this.lastHit = frameCount;
            this.color = randomHue();
            this.velX *= -1;
            this.x =
                boundaryCenter[0] + boundarySideLength / 2 - squareSideLength / 2;
        }
        else if (boundaryCenter[0] -
            boundarySideLength / 2 -
            (this.x - squareSideLength / 2) >
            0) {
            this.lastHit = frameCount;
            this.color = randomHue();
            this.velX *= -1;
            this.x =
                boundaryCenter[0] - boundarySideLength / 2 + squareSideLength / 2;
        }
        if (boundaryCenter[1] +
            boundarySideLength / 2 -
            (this.y + squareSideLength / 2) <
            0) {
            this.lastHit = frameCount;
            this.color = randomHue();
            this.velY *= -1;
            this.y =
                boundaryCenter[1] + boundarySideLength / 2 - squareSideLength / 2;
        }
        else if (boundaryCenter[1] -
            boundarySideLength / 2 -
            (this.y - squareSideLength / 2) >
            0) {
            this.lastHit = frameCount;
            this.color = randomHue();
            this.velY *= -1;
            this.y =
                boundaryCenter[1] - boundarySideLength / 2 + squareSideLength / 2;
        }
        this.opacity = max(map(frameCount, this.lastHit, this.lastHit + colorFadeSpeed, 255, 0), 0);
        fill(this.color, 255, 255, this.opacity);
        rect(this.x, this.y, squareSideLength, squareSideLength);
        this.x += this.velX;
        this.y += this.velY;
    }
}
//# sourceMappingURL=makeSquares.js.map