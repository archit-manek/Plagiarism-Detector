"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comparator_1 = require("./../src/Comparator");
const chai_1 = require("chai");
describe("testComparator", () => {
    it("partialHighPlagiarism", () => {
        let sourceOne = ["let a = 2;", "let b = 4;", "let c = b + a", "let b = 10"];
        let sourceTwo = ["let a = 3;", "let b = 2;", "let c = a + b", "let b = 10"];
        let comparator = new Comparator_1.CodeComparator(sourceOne, sourceTwo);
        let output = comparator.getSimilarity() * 100;
        chai_1.expect(output).to.equal(89.12);
    });
    it("partialLowPlagiarism", () => {
        let sourceOne = ["let x = 2;", "let y = 4;", "let c = x + y", "let z = 20"];
        let sourceTwo = ["let a = 3;", "let b = 2;", "let c = a + b", "let b = 10"];
        let comparator = new Comparator_1.CodeComparator(sourceOne, sourceTwo);
        let output = comparator.getSimilarity() * 100;
        chai_1.expect(output).to.equal(36.730000000000004);
    });
    it("completePlagiarism", () => {
        let sourceOne = ["let a = 2;", "let b = 2;", "let c = a + b", "let b = 10"];
        let sourceTwo = ["let a = 2;", "let b = 2;", "let c = a + b", "let b = 10"];
        let comparator = new Comparator_1.CodeComparator(sourceOne, sourceTwo);
        let output = comparator.getSimilarity() * 100;
        chai_1.expect(output).to.equal(100);
    });
    it("noPlagiarism", () => {
        let sourceOne = [
            "var z = 3;",
            "var x = 10;",
            "var r = z - x",
            "var q = 30",
        ];
        let sourceTwo = ["let a = 2;", "let b = 2;", "let c = a + b", "let b = 10"];
        let comparator = new Comparator_1.CodeComparator(sourceOne, sourceTwo);
        let output = comparator.getSimilarity() * 100;
        chai_1.expect(output).to.equal(0);
    });
});
//# sourceMappingURL=ComparatorTest.spec.js.map