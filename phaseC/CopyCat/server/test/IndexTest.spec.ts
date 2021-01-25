import { expect } from "chai";
import { populateFilter } from "../index";
import { Filter } from "../src/Filter";
import { runPlagiarism } from "../index";

describe("testPopulateFilter", () => {
  it("testBothFilterTrue", () => {
    let output = populateFilter(true, true);
    expect(output).to.have.members([
      Filter.IGNORE_LITERALS,
      Filter.IGNORE_VARIABLE_NAMES,
    ]);
  });
  it("testLiteralTrue", () => {
    let output = populateFilter(true, false);
    expect(output).to.have.members([Filter.IGNORE_LITERALS]);
  });
  it("testVariableTrue", () => {
    let output = populateFilter(false, true);
    expect(output).to.have.members([Filter.IGNORE_VARIABLE_NAMES]);
  });
  it("testBothFalse", () => {
    let output = populateFilter(false, false);
    expect(output).to.have.members([]);
  });
});

describe("testRunPlagiarism", () => {
  it("runPlagiarismNoFilter", () => {
    let output = runPlagiarism(false, false);
    expect(output).to.equal(85.17750000000001);
  });
  it("runPlagiarismIgnoreLiterals", () => {
    let output = runPlagiarism(true, false);
    expect(output).to.equal(89.41250000000001);
  });
  it("runPlagiarismIgnoreVariables", () => {
    let output = runPlagiarism(false, true);
    expect(output).to.equal(86.20000000000002);
  });
  it("runPlagiarismIgnoreBoth", () => {
    let output = runPlagiarism(true, true);
    expect(output).to.equal(90.4325);
  });
});
