"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const normalGame_1 = require("./normalGame");
const tennisSet_1 = require("./tennisSet");
const tieBreakerGame_1 = require("./tieBreakerGame");
class Match {
    constructor(playerName1, playerName2) {
        // Increase point by 1 for a player
        this.pointWonBy = (player) => {
            this.checkMatchStats();
            const { status, winnerIndex } = this.currentGame.incrementPoint(this.players[player]);
            if (status === "completed" && winnerIndex !== null) {
                this.currentSet.incrementPoint(winnerIndex);
            }
        };
        this.checkMatchStats = (gameStats = this.currentGame.stats, setStats = this.currentSet.stats) => {
            if (gameStats.status === "completed" && gameStats.winnerIndex !== null) {
                // 1 Set has been completed. Prevent starting of a new Set
                if (setStats.status === "completed" && setStats.winnerIndex !== null) {
                    console.log("\nGame Over... for now");
                    console.log(this.playerNames[setStats.winnerIndex], "won the Set");
                    return;
                }
                // Check conditions for starting a tie-breaker Game
                if (setStats.points[0] === 6 && setStats.points[1] === 6) {
                    this.currentGame = new tieBreakerGame_1.TieBreakerGame();
                    return;
                }
                this.currentGame = new normalGame_1.NormalGame();
            }
        };
        // Return score as a string
        this.score = (setScore = this.currentSet.score(), gameScore = this.currentGame.score(this.playerNames)) => {
            if (gameScore === "")
                return setScore;
            return `${setScore}, ${gameScore}`;
        };
        this.playerNames = [playerName1, playerName2];
        this.players = {
            [playerName1]: 0,
            [playerName2]: 1,
        };
        this.currentSet = new tennisSet_1.TennisSet();
        this.currentGame = new normalGame_1.NormalGame();
    }
}
exports.Match = Match;
