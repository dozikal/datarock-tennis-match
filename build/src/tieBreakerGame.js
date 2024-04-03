"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TieBreakerGame = void 0;
class TieBreakerGame {
    constructor() {
        // Increase points by 1 for a player
        this.incrementPoint = (playerIndex) => {
            if (this.stats.status === "completed")
                return this.stats;
            this.stats.points[playerIndex] += 1;
            this.stats = this.generateStats();
            return this.stats;
        };
        // Check if a player has won and use this info to generate stats
        this.generateStats = (points = this.stats.points) => {
            const points0 = points[0];
            const points1 = points[1];
            if (points0 >= 7 || points1 >= 7) {
                const pointsDifference = Math.abs(points0 - points1);
                if (pointsDifference >= 2) {
                    const winnerIndex = points0 > points1 ? 0 : 1;
                    return { status: "completed", winnerIndex, points };
                }
            }
            return { status: "in-progress", winnerIndex: null, points };
        };
        // Return score as string
        this.score = (_, points = this.stats.points) => {
            const points0 = points[0];
            const points1 = points[1];
            if (this.stats.status === "completed")
                return "";
            return `${points0}-${points1}`;
        };
        this.stats = { winnerIndex: null, status: "in-progress", points: [0, 0] };
    }
}
exports.TieBreakerGame = TieBreakerGame;
