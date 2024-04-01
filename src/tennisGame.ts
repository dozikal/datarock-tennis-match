export interface GameStats {
  status: "in-progress" | "completed";
  winnerIndex: number | null;
}
type GameType = "normal" | "tie-breaker";
type Points = [number, number];

const BASIC_TENNIS_CALLS = ["0", "15", "30", "40"];

export class TennisGame {
  points: Points;
  stats: GameStats;
  gameType: GameType;

  constructor(type: GameType) {
    if (type === "tie-breaker") {
      throw new Error("not implemented");
    }
    this.gameType = type;
    this.points = [0, 0];
    this.stats = { winnerIndex: null, status: "in-progress" };
  }

  // Increase points by 1 for a player
  incrementPoint = (playerIndex: number): GameStats => {
    if (this.stats.status === "completed") return this.stats;
    this.points[playerIndex] += 1;

    return this.checkWinCondition();
  };

  // Check if a player has won
  checkWinCondition = (points = this.points): GameStats => {
    const points0 = points[0];
    const points1 = points[1];

    if (points0 >= 4 || points1 >= 4) {
      const pointsDifference = Math.abs(points0 - points1);

      if (pointsDifference >= 2) {
        const winnerIndex = points0 > points1 ? 0 : 1;
        return { status: "completed", winnerIndex };
      }
    }

    return { status: "in-progress", winnerIndex: null };
  };

  // Return score as string
  score = (playerNames: [string, string], points = this.points): string => {
    const points0 = points[0];
    const points1 = points[1];

    // Deuce condition
    if (points0 === points1 && points0 >= 3) return "Deuce";

    //   Minimum win condition
    if (points0 >= 4 || points1 >= 4) {
      const pointsDifference = Math.abs(points0 - points1);

      // Advantage condition
      if (pointsDifference === 1) {
        const advantagePlayerIndex = points0 > points1 ? 0 : 1;
        return `Advantage ${playerNames[advantagePlayerIndex]}`;
      }

      // Game(Win) condition.
      // Should probably return "Game" but the example returned nothing.
      if (pointsDifference >= 2) return "";
    }

    // No winner or special conditions, game still in play
    return `${BASIC_TENNIS_CALLS[points0]}-${BASIC_TENNIS_CALLS[points1]}`;
  };
}
