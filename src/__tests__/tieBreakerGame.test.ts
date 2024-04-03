import { GameStatus, Stats } from "../normalGame";
import { TieBreakerGame } from "../tieBreakerGame";

describe("TieBreakerGame", () => {
  const playerNames: [string, string] = ["player 1", "player 2"];

  describe("incrementPoint()", () => {
    const tennisGame = new TieBreakerGame();

    it("should increase point for player index 0", () => {
      tennisGame.incrementPoint(0);
      expect(tennisGame.stats.points).toEqual([1, 0]);
    });

    it("should increase point for player index 1", () => {
      tennisGame.incrementPoint(1);
      expect(tennisGame.stats.points).toEqual([1, 1]);
    });

    it("should increase point for player index 1 twice", () => {
      tennisGame.incrementPoint(1);
      tennisGame.incrementPoint(1);
      expect(tennisGame.stats.points).toEqual([1, 3]);
    });

    it("should not increase point when game status is completed", () => {
      tennisGame.stats.status = "completed";
      tennisGame.incrementPoint(1);
      expect(tennisGame.stats.points).toEqual([1, 3]);
    });
  });

  describe("generateStats()", () => {
    const tennisGame = new TieBreakerGame();

    interface TestCase {
      name: string;
      points: [number, number];
      expected: Stats;
    }

    const testCases: TestCase[] = [
      // Same points
      {
        name: "should have no winner when points are same: 0-0",
        points: [0, 0],
        expected: { status: "in-progress", winnerIndex: null, points: [0, 0] },
      },
      {
        name: "should have no winner when points are same: 1-1",
        points: [1, 1],
        expected: { status: "in-progress", winnerIndex: null, points: [1, 1] },
      },
      {
        name: "should have no winner when points are same: 4-4",
        points: [4, 4],
        expected: { status: "in-progress", winnerIndex: null, points: [4, 4] },
      },
      {
        name: "should have no winner when points are same: 9-9",
        points: [9, 9],
        expected: { status: "in-progress", winnerIndex: null, points: [9, 9] },
      },
      // Points differ by 1
      {
        name: "should have no winner when points diff is 1: 1-0",
        points: [1, 0],
        expected: { status: "in-progress", winnerIndex: null, points: [1, 0] },
      },
      {
        name: "should have no winner when points diff is 1: 3-4",
        points: [3, 4],
        expected: { status: "in-progress", winnerIndex: null, points: [3, 4] },
      },
      {
        name: "should have no winner when points diff is 1: 6-7",
        points: [6, 7],
        expected: { status: "in-progress", winnerIndex: null, points: [6, 7] },
      },
      // Points differ by 2+, win condition not met
      {
        name: "should have no winner when points differ by 2+ and win condition not met: 0-2",
        points: [0, 2],
        expected: { status: "in-progress", winnerIndex: null, points: [0, 2] },
      },
      {
        name: "should have no winner when points differ by 2+ and win condition not met: 1-3",
        points: [1, 3],
        expected: { status: "in-progress", winnerIndex: null, points: [1, 3] },
      },
      {
        name: "should have no winner when points differ by 2+ and win condition not met: 6-4",
        points: [6, 4],
        expected: { status: "in-progress", winnerIndex: null, points: [6, 4] },
      },
      // Points differ by 2+, win condition met
      {
        name: "should have winner when points differ by 2+ and win condition not met: 0-7",
        points: [0, 7],
        expected: { status: "completed", winnerIndex: 1, points: [0, 7] },
      },
      {
        name: "should have winner when points differ by 2 and win condition not met: 5-7",
        points: [5, 7],
        expected: { status: "completed", winnerIndex: 1, points: [5, 7] },
      },
      {
        name: "should have winner when points differ by 2 and win condition not met: 9-7",
        points: [9, 7],
        expected: { status: "completed", winnerIndex: 0, points: [9, 7] },
      },
    ];

    test.each(testCases)("$name", ({ points, expected }) => {
      expect(tennisGame.generateStats(points)).toMatchObject(expected);
    });
  });

  describe("score()", () => {
    const tennisGame = new TieBreakerGame();
    tennisGame.stats.status = "in-progress";

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
        expected: "2-2",
      },
      {
        name: "should return correct score when points are same: 5-6",
        points: [5, 6],
        expected: "5-6",
      },
    ];

    test.each(testCases)("$name", ({ points, expected }) => {
      expect(tennisGame.score(playerNames, points)).toBe(expected);
    });

    it("should return correct score when game status is completed: 5-7", () => {
      tennisGame.stats.status = "completed";
      expect(tennisGame.score(playerNames, [5, 7])).toBe("");
    });
  });
});
