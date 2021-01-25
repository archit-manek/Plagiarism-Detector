import { CodeComparator } from "./../src/Comparator";
import { expect } from "chai";

describe("testComparator", () => {
  it("partialHighPlagiarism", () => {
    let sourceOne = ["let a = 2;", "let b = 4;", "let c = b + a", "let b = 10"];
    let sourceTwo = ["let a = 3;", "let b = 2;", "let c = a + b", "let b = 10"];
    let comparator = new CodeComparator(sourceOne, sourceTwo);
    let output = comparator.getSimilarity() * 100;
    expect(output).to.equal(89.12);
  });
  it("partialLowPlagiarism", () => {
    let sourceOne = ["let x = 2;", "let y = 4;", "let c = x + y", "let z = 20"];
    let sourceTwo = ["let a = 3;", "let b = 2;", "let c = a + b", "let b = 10"];
    let comparator = new CodeComparator(sourceOne, sourceTwo);
    let output = comparator.getSimilarity() * 100;
    expect(output).to.equal(36.730000000000004);
  });
  it("completePlagiarism", () => {
    let sourceOne = ["let a = 2;", "let b = 2;", "let c = a + b", "let b = 10"];
    let sourceTwo = ["let a = 2;", "let b = 2;", "let c = a + b", "let b = 10"];
    let comparator = new CodeComparator(sourceOne, sourceTwo);
    let output = comparator.getSimilarity() * 100;
    expect(output).to.equal(100);
  });
  it("noPlagiarism", () => {
    let sourceOne = [
      "var z = 3;",
      "var x = 10;",
      "var r = z - x",
      "var q = 30",
    ];
    let sourceTwo = ["let a = 2;", "let b = 2;", "let c = a + b", "let b = 10"];
    let comparator = new CodeComparator(sourceOne, sourceTwo);
    let output = comparator.getSimilarity() * 100;
    expect(output).to.equal(0);
  });
});
