import { TennisSet } from "../tennisSet";

describe("TennisSet", () => {
  describe("incrementPoint()", () => {
    const tennisSet = new TennisSet();

    it("should increase point for player index 0", () => {
      tennisSet.incrementPoint(0);
      expect(tennisSet.points).toEqual([1, 0]);
    });

    it("should increase point for player index 1", () => {
      tennisSet.incrementPoint(1);
      expect(tennisSet.points).toEqual([1, 1]);
    });

    it("should increase point for player index 1 twice", () => {
      tennisSet.incrementPoint(1);
      tennisSet.incrementPoint(1);
      expect(tennisSet.points).toEqual([1, 3]);
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
