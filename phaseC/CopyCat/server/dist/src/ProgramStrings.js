"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramString = void 0;
/**
 * A class that represents an object which holds
 * all the 4 String Representation of a program.
 */
class ProgramString {
    constructor(name) {
        this.name = name;
        this.lines = [];
        this.fileStructure = [];
        this.identifiers = [];
        this.literals = [];
        this.tokens = [];
    }
    /**
     * Get the name of the program.
     */
    getName() {
        return this.name;
    }
    /**
     * Get the file structure of the program.
     */
    getFileStructure() {
        return this.fileStructure;
    }
    /**
     * Get the lines of the program.
     */
    getLines() {
        return this.lines;
    }
    /**
     * Get the Identifiers of the program.
     */
    getIdentifiers() {
        return this.identifiers;
    }
    /**
     * Get the Literals of the program.
     */
    getLiterals() {
        return this.literals;
    }
    /**
     * Get the Tokens of the program.
     */
    getTokens() {
        return this.tokens;
    }
    /**
     * Add the first token of a line to the File Structure list.
     */
    appendFileStructure(char) {
        this.fileStructure.push(char);
    }
    /**
     * Add the current line of the program to the lines list.
     */
    appendLine(line) {
        this.lines.push(line);
    }
    /**
     * Add an Identifier to the Identifiers list.
     */
    appendIdentifiers(char) {
        this.identifiers.push(char);
    }
    /**
     * Add a Literal to the Literals list.
     */
    appendLiterals(char) {
        this.literals.push(char);
    }
    /**
     * Add a Token to the Tokens list.
     */
    appendTokens(char) {
        this.tokens.push(char);
    }
    /**
     * Gets all the strings of the program.
     */
    getAllStrings() {
        let out = [];
        out.push(this.getFileStructure().join(""));
        out.push(this.getIdentifiers().sort().join(""));
        out.push(this.getLiterals().join(""));
        out.push(this.getTokens().join(""));
        return out;
    }
    /**
     * Gives the string format of the program.
     */
    toString() {
        let out = "--------------------------------";
        out += "\n\nFile Structure: " + this.getFileStructure();
        out += "\n\nIdentifiers: " + this.getIdentifiers();
        out += "\n\nLiterals: " + this.getLiterals();
        out += "\n\nTokens: " + this.getTokens();
        out += "\n\n";
        return out;
    }
}
exports.ProgramString = ProgramString;
//# sourceMappingURL=ProgramStrings.js.map