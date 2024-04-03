import { Match } from "../match";

describe("Match", () => {
  describe("score()", () => {
    const match = new Match("player 1", "player 2");

    it("should format score properly when both scores exist", () => {
      expect(match.score("1-0", "3-2")).toEqual("1-0, 3-2");
    });

    it("should format score properly only set score is available", () => {
      expect(match.score("5-0", "")).toEqual("5-0");
    });
  });
});
