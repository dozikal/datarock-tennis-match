"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_1 = require("./src/match");
console.log("###  Datarock Tennis Match ###\n");
const match = new match_1.Match("player 1", "player 2");
match.pointWonBy("player 1");
match.pointWonBy("player 2");
// this will return "0-0, 15-15"
console.log(match.score());
match.pointWonBy("player 1");
match.pointWonBy("player 1");
// this will return "0-0, 40-15"
console.log(match.score());
match.pointWonBy("player 2");
match.pointWonBy("player 2");
// this will return "0-0, Deuce"
console.log(match.score());
match.pointWonBy("player 1");
// this will return "0-0, Advantage player 1"
console.log(match.score());
match.pointWonBy("player 1");
// this will return "1-0"
console.log(match.score());
