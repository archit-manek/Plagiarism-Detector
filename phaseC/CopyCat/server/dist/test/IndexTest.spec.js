"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../index");
const Filter_1 = require("../src/Filter");
const index_2 = require("../index");
describe("testPopulateFilter", () => {
    it("testBothFilterTrue", () => {
        let output = index_1.populateFilter(true, true);
        chai_1.expect(output).to.have.members([
            Filter_1.Filter.IGNORE_LITERALS,
            Filter_1.Filter.IGNORE_VARIABLE_NAMES,
        ]);
    });
    it("testLiteralTrue", () => {
        let output = index_1.populateFilter(true, false);
        chai_1.expect(output).to.have.members([Filter_1.Filter.IGNORE_LITERALS]);
    });
    it("testVariableTrue", () => {
        let output = index_1.populateFilter(false, true);
        chai_1.expect(output).to.have.members([Filter_1.Filter.IGNORE_VARIABLE_NAMES]);
    });
    it("testBothFalse", () => {
        let output = index_1.populateFilter(false, false);
        chai_1.expect(output).to.have.members([]);
    });
});
describe("testRunPlagiarism", () => {
    it("runPlagiarismNoFilter", () => {
        let output = index_2.runPlagiarism(false, false);
        chai_1.expect(output).to.equal(85.17750000000001);
    });
    it("runPlagiarismIgnoreLiterals", () => {
        let output = index_2.runPlagiarism(true, false);
        chai_1.expect(output).to.equal(89.41250000000001);
    });
    it("runPlagiarismIgnoreVariables", () => {
        let output = index_2.runPlagiarism(false, true);
        chai_1.expect(output).to.equal(86.20000000000002);
    });
    it("runPlagiarismIgnoreBoth", () => {
        let output = index_2.runPlagiarism(true, true);
        chai_1.expect(output).to.equal(90.4325);
    });
});
//# sourceMappingURL=IndexTest.spec.js.map