"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TennisSet = void 0;
class TennisSet {
    constructor() {
        // Increase point by 1 for a player
        this.incrementPoint = (playerIndex) => {
            this.points[playerIndex] += 1;
        };
        // Not implemented because assessment stated to focus on 1 set
        this.checkWinCondition = (points = this.points) => {
            throw new Error("not implemented");
        };
        // Return the score as string
        this.score = (points = this.points) => {
            return `${points[0]}-${points[1]}`;
        };
        this.points = [0, 0];
    }
}
exports.TennisSet = TennisSet;
