import { Points, Stats } from "./normalGame";

export class TennisSet {
  stats: Stats;

  constructor() {
    this.stats = { points: [0, 0], winnerIndex: null, status: "in-progress" };
  }

  // Increase point by 1 for a player
  incrementPoint = (playerIndex: number): Stats => {
    if (this.stats.status === "completed") return this.stats;

    this.stats.points[playerIndex] += 1;

    this.stats = this.generateStats();
    return this.stats;
  };

  // This method checks win condition and uses it to generate stats
  generateStats = (points = this.stats.points): Stats => {
    const points0 = points[0];
    const points1 = points[1];

    if (points0 === 7) return { status: "completed", winnerIndex: 0, points };
    if (points1 === 7) return { status: "completed", winnerIndex: 1, points };

    if (points0 >= 6 || points1 >= 6) {
      const pointsDifference = Math.abs(points0 - points1);

      if (pointsDifference >= 2) {
        const winnerIndex = points0 > points1 ? 0 : 1;
        return { status: "completed", winnerIndex, points };
      }
    }

    return { status: "in-progress", winnerIndex: null, points };
  };

  // Return the score as string
  score = (points = this.stats.points) => {
    return `${points[0]}-${points[1]}`;
  };
}
