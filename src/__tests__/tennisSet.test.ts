import { Stats } from "../normalGame";
import { TennisSet } from "../tennisSet";

describe("TennisSet", () => {
  describe("incrementPoint()", () => {
    const tennisSet = new TennisSet();

    it("should increase point for player index 0", () => {
      tennisSet.incrementPoint(0);
      expect(tennisSet.stats.points).toEqual([1, 0]);
    });

    it("should increase point for player index 1", () => {
      tennisSet.incrementPoint(1);
      expect(tennisSet.stats.points).toEqual([1, 1]);
    });

    it("should increase point for player index 1 twice", () => {
      tennisSet.incrementPoint(1);
      tennisSet.incrementPoint(1);
      expect(tennisSet.stats.points).toEqual([1, 3]);
    });
  });

  describe("generateStats()", () => {
    const tennisGame = new TennisSet();

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
        name: "should have no winner when points are same: 6-6",
        points: [6, 6],
        expected: { status: "in-progress", winnerIndex: null, points: [6, 6] },
      },
      // Points differ by 1, win condition not met
      {
        name: "should have no winner when points diff is 1: 1-0",
        points: [1, 0],
        expected: { status: "in-progress", winnerIndex: null, points: [1, 0] },
      },
      {
        name: "should have no winner when points diff is 1: 4-5",
        points: [4, 5],
        expected: { status: "in-progress", winnerIndex: null, points: [4, 5] },
      },
      // Points differ by 1, win condition met
      {
        name: "should have winner when points differ by 1 and win condition met: 7-6",
        points: [7, 6],
        expected: { status: "completed", winnerIndex: 0, points: [7, 6] },
      },
      // Points differ by 2+, win condition met
      {
        name: "should have winner when points differ by 2+ and win condition not met: 0-6",
        points: [0, 6],
        expected: { status: "completed", winnerIndex: 1, points: [0, 6] },
      },
      {
        name: "should have winner when points differ by 2 and win condition not met: 4-6",
        points: [4, 6],
        expected: { status: "completed", winnerIndex: 1, points: [4, 6] },
      },
    ];

    test.each(testCases)("$name", ({ points, expected }) => {
      expect(tennisGame.generateStats(points)).toMatchObject(expected);
    });
  });

  describe("score()", () => {
    const tennisSet = new TennisSet();

    it("should return correct score when points are: 0-0", () => {
      expect(tennisSet.score([0, 0])).toEqual("0-0");
    });

    it("should return correct score when points are: 1-0", () => {
      expect(tennisSet.score([1, 0])).toEqual("1-0");
    });
  });
});
