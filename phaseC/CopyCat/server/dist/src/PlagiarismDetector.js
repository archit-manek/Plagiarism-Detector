"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlagiarismDetector = void 0;
const parser_1 = require("@babel/parser");
const ProgramStrings_1 = require("./ProgramStrings");
const traverse_1 = __importDefault(require("@babel/traverse"));
const Filter_1 = require("./Filter");
const hasha = require("hasha");
/**
 * This is the concrete product of the Factory Pattern.
 * It implements the product interface IPlagiarismDetector.
 * The detector builds an AST of the program and traverses it to
 * build the 4-string representation.
 */
class PlagiarismDetector {
    constructor(program, filter, name) {
        this.program = program;
        this.filter = filter;
        this.name = name;
        this.stringStructures = new ProgramStrings_1.ProgramString(name);
        this.buildAST();
        this.buildProgramStringRepresentation();
    }
    /**
     * Build an AST for the program source using the Babel Parser.
     */
    buildAST() {
        this.AST = parser_1.parse(this.program, {
            allowImportExportEverywhere: true,
            allowAwaitOutsideFunction: true,
            allowReturnOutsideFunction: true,
            allowSuperOutsideMethod: true,
            allowUndeclaredExports: true,
        });
    }
    /**
     * Get the AST of this program.
     */
    getAST() {
        return this.AST;
    }
    /**
     * Traverse the AST and build the 4-string representation.
     */
    buildProgramStringRepresentation() {
        let stringStructures = this.stringStructures;
        let filter = this.filter;
        let checkLoops = this.checkLoops;
        traverse_1.default(this.AST, {
            enter(path) {
                // populating the file structure
                if (!stringStructures.getLines().includes(path.node.loc.start.line)) {
                    if (checkLoops(path.type))
                        path.type = "ForStatement";
                    stringStructures.appendFileStructure(path.type);
                    stringStructures.appendLine(path.node.loc.start.line);
                }
                // populating the identifiers
                if (path.node.type.includes("Identifier") &&
                    !filter.includes(Filter_1.Filter.IGNORE_VARIABLE_NAMES)) {
                    stringStructures.appendIdentifiers(hasha(path.node.name));
                }
                // populating the literals
                if (path.node.type.includes("Literal") &&
                    !filter.includes(Filter_1.Filter.IGNORE_LITERALS)) {
                    stringStructures.appendLiterals(path.node.value.toString().replace(' ', ''));
                }
                // populating the tokens
                stringStructures.appendTokens(path.type);
            },
        });
    }
    /**
     * Get all 4 string representations with an instance of the ProgramString.
     */
    getStringRepresentation() {
        return this.stringStructures;
    }
    /**
     * Consider all loops to be the same.
     */
    checkLoops(node) {
        return ["ForStatement", "WhileStatement", "DoWhileStatement"].includes(node);
    }
}
exports.PlagiarismDetector = PlagiarismDetector;
//# sourceMappingURL=PlagiarismDetector.js.map