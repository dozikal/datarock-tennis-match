"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const tennisGame_1 = require("./tennisGame");
const tennisSet_1 = require("./tennisSet");
class Match {
    constructor(playerName1, playerName2) {
        // Increase point by 1 for a player
        this.pointWonBy = (player) => {
            const { status, winnerIndex } = this.currentGame.incrementPoint(this.players[player]);
            if (status === "completed" && winnerIndex !== null) {
                this.currentSet.incrementPoint(winnerIndex);
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
        this.currentGame = new tennisGame_1.TennisGame("normal");
    }
}
exports.Match = Match;
