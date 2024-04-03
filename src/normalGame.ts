export interface Stats {
  status: GameStatus;
  points: Points;
  winnerIndex: number | null;
}
export interface TennisGame {
  stats: Stats;
  incrementPoint: (playerIndex: number) => Stats;
  score: (playerNames: [string, string], points?: Points) => string;
}
export type GameStatus = "in-progress" | "completed";
export type Points = [number, number];
const BASIC_TENNIS_CALLS = ["0", "15", "30", "40"];

export class NormalGame implements TennisGame {
  stats: Stats;

  constructor() {
    this.stats = { winnerIndex: null, status: "in-progress", points: [0, 0] };
  }

  // Increase points by 1 for a player
  incrementPoint = (playerIndex: number): Stats => {
    if (this.stats.status === "completed") return this.stats;

    this.stats.points[playerIndex] += 1;
    this.stats = this.generateStats();
    return this.stats;
  };

  // Check if a player has won and use this info to generate stats
  generateStats = (points = this.stats.points): Stats => {
    const points0 = points[0];
    const points1 = points[1];

    if (points0 >= 4 || points1 >= 4) {
      const pointsDifference = Math.abs(points0 - points1);

      if (pointsDifference >= 2) {
        const winnerIndex = points0 > points1 ? 0 : 1;
        return { status: "completed", winnerIndex, points };
      }
    }

    return { status: "in-progress", winnerIndex: null, points };
  };

  // Return score as string
  score = (
    playerNames: [string, string],
    points = this.stats.points
  ): string => {
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
