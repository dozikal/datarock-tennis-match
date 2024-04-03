import { NormalGame, TennisGame } from "./normalGame";
import { TennisSet } from "./tennisSet";
import { TieBreakerGame } from "./tieBreakerGame";

export class Match {
  players: { [name: string]: number };
  playerNames: [string, string];

  currentSet: TennisSet;
  currentGame: TennisGame;

  constructor(playerName1: string, playerName2: string) {
    this.playerNames = [playerName1, playerName2];
    this.players = {
      [playerName1]: 0,
      [playerName2]: 1,
    };

    this.currentSet = new TennisSet();
    this.currentGame = new NormalGame();
  }

  // Increase point by 1 for a player
  pointWonBy = (player: string) => {
    this.checkMatchStats();

    const { status, winnerIndex } = this.currentGame.incrementPoint(
      this.players[player]
    );

    if (status === "completed" && winnerIndex !== null) {
      this.currentSet.incrementPoint(winnerIndex);
    }
  };

  checkMatchStats = (
    gameStats = this.currentGame.stats,
    setStats = this.currentSet.stats
  ) => {
    if (gameStats.status === "completed" && gameStats.winnerIndex !== null) {
      // 1 Set has been completed. Prevent starting of a new Set
      if (setStats.status === "completed" && setStats.winnerIndex !== null) {
        console.log("\nGame Over... for now");
        console.log(this.playerNames[setStats.winnerIndex], "won the Set");
        return;
      }

      // Check conditions for starting a tie-breaker Game
      if (setStats.points[0] === 6 && setStats.points[1] === 6) {
        this.currentGame = new TieBreakerGame();
        return;
      }

      this.currentGame = new NormalGame();
    }
  };

  // Return score as a string
  score = (
    setScore = this.currentSet.score(),
    gameScore = this.currentGame.score(this.playerNames)
  ) => {
    if (gameScore === "") return setScore;
    return `${setScore}, ${gameScore}`;
  };
}
