export class TennisSet {
  points: [number, number];

  constructor() {
    this.points = [0, 0];
  }

  // Increase point by 1 for a player
  incrementPoint = (playerIndex: number) => {
    this.points[playerIndex] += 1;
  };

  // Not implemented because assessment stated to focus on 1 set
  checkWinCondition = (points = this.points) => {
    throw new Error("not implemented");
  };

  // Return the score as string
  score = (points = this.points) => {
    return `${points[0]}-${points[1]}`;
  };
}
