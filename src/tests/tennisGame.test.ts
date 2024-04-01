import { GameStats, TennisGame } from "../tennisGame";

describe("TennisGame", () => {
  const playerNames: [string, string] = ["player 1", "player 2"];

  describe("incrementPoint()", () => {
    const tennisGame = new TennisGame("normal");

    it("should increase point for player index 0", () => {
      tennisGame.incrementPoint(0);
      expect(tennisGame.points).toEqual([1, 0]);
    });

    it("should increase point for player index 1", () => {
      tennisGame.incrementPoint(1);
      expect(tennisGame.points).toEqual([1, 1]);
    });

    it("should increase point for player index 1 twice", () => {
      tennisGame.incrementPoint(1);
      tennisGame.incrementPoint(1);
      expect(tennisGame.points).toEqual([1, 3]);
    });

    it("should not increase point when game status is completed", () => {
      tennisGame.stats.status = "completed";
      tennisGame.incrementPoint(1);
      expect(tennisGame.points).toEqual([1, 3]);
    });
  });

  describe("checkWinCondition() for'normal' game", () => {
    const tennisGame = new TennisGame("normal");

    interface TestCase {
      name: string;
      points: [number, number];
      expected: GameStats;
    }

    const testCases: TestCase[] = [
      // Same points
      {
        name: "should have no winner when points are same: 0-0",
        points: [0, 0],
        expected: { status: "in-progress", winnerIndex: null },
      },
      {
        name: "should have no winner when points are same: 1-1",
        points: [1, 1],
        expected: { status: "in-progress", winnerIndex: null },
      },
      {
        name: "should have no winner when points are same: 4-4",
        points: [4, 4],
        expected: { status: "in-progress", winnerIndex: null },
      },
      {
        name: "should have no winner when points are same: 9-9",
        points: [9, 9],
        expected: { status: "in-progress", winnerIndex: null },
      },
      // Points differ by 1
      {
        name: "should have no winner when points diff is 1: 1-0",
        points: [1, 0],
        expected: { status: "in-progress", winnerIndex: null },
      },
      {
        name: "should have no winner when points diff is 1: 3-4",
        points: [3, 4],
        expected: { status: "in-progress", winnerIndex: null },
      },
      {
        name: "should have no winner when points diff is 1: 6-5",
        points: [6, 5],
        expected: { status: "in-progress", winnerIndex: null },
      },
      // Points differ by 2+, win condition not met
      {
        name: "should have no winner when points differ by 2+ and win condition not met: 0-2",
        points: [0, 2],
        expected: { status: "in-progress", winnerIndex: null },
      },
      {
        name: "should have no winner when points differ by 2+ and win condition not met: 1-3",
        points: [1, 3],
        expected: { status: "in-progress", winnerIndex: null },
      },
      {
        name: "should have no winner when points differ by 2+ and win condition not met: 3-0",
        points: [3, 0],
        expected: { status: "in-progress", winnerIndex: null },
      },
      // Points differ by 2+, win condition met
      {
        name: "should have winner when points differ by 2+ and win condition not met: 0-4",
        points: [0, 4],
        expected: { status: "completed", winnerIndex: 1 },
      },
      {
        name: "should have winner when points differ by 2 and win condition not met: 4-2",
        points: [4, 2],
        expected: { status: "completed", winnerIndex: 0 },
      },
      {
        name: "should have winner when points differ by 2 and win condition not met: 10-8",
        points: [10, 8],
        expected: { status: "completed", winnerIndex: 0 },
      },
    ];

    test.each(testCases)("$name", ({ points, expected }) => {
      expect(tennisGame.checkWinCondition(points)).toMatchObject(expected);
    });
  });

  describe("score() for 'normal' game", () => {
    const tennisGame = new TennisGame("normal");

    interface TestCase {
      name: string;
      points: [number, number];
      expected: string;
    }

    const testCases: TestCase[] = [
      // Points are the same
      {
        name: "should return correct score when points are same: 0-0",
        points: [0, 0],
        expected: "0-0",
      },
      {
        name: "should return correct score when points are same: 2-2",
        points: [2, 2],
        expected: "30-30",
      },
      {
        name: "should return correct score when points are same: 3-3 each",
        points: [3, 3],
        expected: "Deuce",
      },
      {
        name: "should return correct score when points are same: 4-4",
        points: [4, 4],
        expected: "Deuce",
      },
      // Points have a difference of 1
      {
        name: "should return correct score when points have diff of 1: 1 - 0",
        points: [1, 0],
        expected: "15-0",
      },
      {
        name: "should return correct score when points have diff of 1: 3 - 2",
        points: [3, 2],
        expected: "40-30",
      },
      {
        name: "should return correct score when points have diff of 1: 3 - 4",
        points: [3, 4],
        expected: "Advantage player 2",
      },
      {
        name: "should return correct score when points have diff of 1: 8 - 7",
        points: [8, 7],
        expected: "Advantage player 1",
      },
      // Points have a difference of 2
      {
        name: "should return correct score when points have diff of 2: 0 - 2",
        points: [0, 2],
        expected: "0-30",
      },
      {
        name: "should return correct score when points have diff of 2: 2 - 4",
        points: [2, 4],
        expected: "",
      },
      {
        name: "should return correct score when points have diff of 2: 2 - 4",
        points: [3, 5],
        expected: "",
      },
      {
        name: "should return correct score when points have diff of 2: 10 - 8",
        points: [10, 8],
        expected: "",
      },
      // Points have a difference of 3 or more
      {
        name: "should return correct score when points have diff of 3: 0 - 3",
        points: [0, 3],
        expected: "0-40",
      },
      {
        name: "should return correct score when points have diff of 3: 1 - 4",
        points: [1, 4],
        expected: "",
      },
      {
        name: "should return correct score when points have diff of 4: 4 - 0",
        points: [4, 0],
        expected: "",
      },
    ];

    test.each(testCases)("$name", ({ points, expected }) => {
      expect(tennisGame.score(playerNames, points)).toBe(expected);
    });
  });
});
