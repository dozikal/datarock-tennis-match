import { TennisGame } from "./tennisGame";
import { TennisSet } from "./tennisSet";

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
    this.currentGame = new TennisGame("normal");
  }

  // Increase point by 1 for a player
  pointWonBy = (player: string) => {
    const { status, winnerIndex } = this.currentGame.incrementPoint(
      this.players[player]
    );

    if (status === "completed" && winnerIndex !== null) {
      this.currentSet.incrementPoint(winnerIndex);
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
