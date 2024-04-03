import { Stats, TennisGame } from "./normalGame";

export class TieBreakerGame implements TennisGame {
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
  score = (_: [string, string], points = this.stats.points): string => {
    const points0 = points[0];
    const points1 = points[1];

    if (this.stats.status === "completed") return "";
    return `${points0}-${points1}`;
  };
}
