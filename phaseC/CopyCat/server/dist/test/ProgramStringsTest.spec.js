"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ProgramStrings_1 = require("../src/ProgramStrings");
let program = new ProgramStrings_1.ProgramString("one");
let program1 = new ProgramStrings_1.ProgramString("two");
describe("Program Strings Test", () => {
    it("getName", () => {
        chai_1.expect(program.getName()).to.equal("one");
    });
    it("getFileStructure", () => {
        program.appendFileStructure("d");
        let structure = program.getFileStructure();
        chai_1.expect(structure).to.have.members(["d"]);
    });
    it("getLines", () => {
        program.appendLine(5);
        let lines = program.getLines();
        chai_1.expect(lines).to.have.members([5]);
    });
    it("getIdentifiers", () => {
        program.appendIdentifiers("sf");
        let identifier = program.getIdentifiers();
        chai_1.expect(identifier).to.have.members(["sf"]);
    });
    it("getLiterals", () => {
        program.appendLiterals("xyz");
        let literals = program.getLiterals();
        chai_1.expect(literals).to.have.members(["xyz"]);
    });
    it("getTokens", () => {
        program.appendTokens("abc");
        let tokens = program.getTokens();
        chai_1.expect(tokens).to.have.members(["abc"]);
    });
    it("toString", () => {
        program.appendTokens("abc");
        let toString = program.toString();
        chai_1.expect(toString).to.equal("--------------------------------\n\nFile Structure: d\n\nIdentifiers: sf\n\nLiterals: xyz\n\nTokens: abc,abc\n\n");
    });
    it("allStrings", () => {
        program.appendTokens("abc");
        let allStrings = program.getAllStrings();
        chai_1.expect(allStrings).to.have.members(["d", "sf", "xyz", "abcabcabc"]);
    });
});
describe("Program Strings Test (Edge Cases)", () => {
    it("FileStructure, empty string", () => {
        program1.appendFileStructure("");
        let structure = program1.getFileStructure();
        chai_1.expect(structure).to.have.members([""]);
    });
    it("Lines, negative number", () => {
        program1.appendLine(-3);
        let structure = program1.getLines();
        chai_1.expect(structure).to.have.members([-3]);
    });
    it("Identifiers, null value", () => {
        program1.appendIdentifiers(null);
        let structure = program1.getIdentifiers();
        chai_1.expect(structure).to.have.members([null]);
    });
    it("toString", () => {
        program1.appendTokens("abc");
        let structure = program1.toString();
        chai_1.expect(structure).to.equal("--------------------------------\n\nFile Structure: \n\nIdentifiers: \n\nLiterals: \n\nTokens: abc\n\n");
    });
    it("allStrings", () => {
        program1.appendTokens("abc");
        let structure = program1.getAllStrings();
        chai_1.expect(structure).to.have.members(["", "", "", "abcabc"]);
    });
});
//# sourceMappingURL=ProgramStringsTest.spec.js.map