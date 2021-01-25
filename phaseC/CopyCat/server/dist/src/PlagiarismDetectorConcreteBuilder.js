"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlagiarismDetectorConcreteBuilder = void 0;
const parser_1 = require("@babel/parser");
const ProgramStrings_1 = require("./ProgramStrings");
const traverse_1 = __importDefault(require("@babel/traverse"));
const Filter_1 = require("./Filter");
const hasha = require('hasha');
// this class generates the AST and traverses it and builds the strings
class PlagiarismDetectorConcreteBuilder {
    constructor(program, filter) {
        this.program = program;
        this.filter = filter;
        this.stringStructures = new ProgramStrings_1.Program();
        this.buildAST();
        this.buildProgramStringRepresentation();
    }
    buildAST() {
        this.AST = parser_1.parse(this.program, {
            allowImportExportEverywhere: true,
            allowAwaitOutsideFunction: true,
            allowReturnOutsideFunction: true,
            allowSuperOutsideMethod: true,
            allowUndeclaredExports: true,
        });
    }
    getAST() {
        return this.AST;
    }
    // it was difficult to call these within the traverse function as the
    // 'this' keyword was getting considered as the AST's own method
    /* buildFileStructureString(path) {
      this.stringStructures.appendFileStructure(path.type)
      this.stringStructures.appendLine(path.node.loc.start.line)
    }
  
    buildIdentifierString(path) {
      this.stringStructures.appendIdentifiers(path.node.name)
    }
  
    buildLiteralsString(path) {
      this.stringStructures.appendLiterals(path.node.value)
    }
  
    buildTokenString(path) {
      this.stringStructures.appendTokens(path.type)
    } */
    buildProgramStringRepresentation() {
        let stringStructures = this.stringStructures;
        let filter = this.filter;
        traverse_1.default(this.AST, {
            enter(path) {
                //console.log(path.type)
                // populating the file structure
                if (!stringStructures.getLines().includes(path.node.loc.start.line)) {
                    stringStructures.appendFileStructure(path.type);
                    stringStructures.appendLine(path.node.loc.start.line);
                }
                // populating the identifiers
                if (path.node.type.includes("Identifier") && !filter.includes(Filter_1.Filter.IGNORE_VARIABLE_NAMES)) {
                    stringStructures.appendIdentifiers(hasha(path.node.name));
                    //stringStructures.appendIdentifiers(path.node.name)
                    //program.appendIdentifiers(AES.encrypt(path.node.name, '1').toString())
                }
                // populating the literals
                if (path.node.type.includes("Literal") && !filter.includes(Filter_1.Filter.IGNORE_LITERALS)) {
                    stringStructures.appendLiterals(path.node.value);
                }
                // populating the tokens
                stringStructures.appendTokens(path.type);
            },
        });
    }
    // get the entire array of 4 strings for this program
    getStringRepresentation() {
        return this.stringStructures;
    }
}
exports.PlagiarismDetectorConcreteBuilder = PlagiarismDetectorConcreteBuilder;
//# sourceMappingURL=PlagiarismDetectorConcreteBuilder.js.map