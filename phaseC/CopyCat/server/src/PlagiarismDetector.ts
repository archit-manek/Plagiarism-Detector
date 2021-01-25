import { parse } from "@babel/parser";
import { ProgramString } from "./ProgramStrings";
import traverse from "@babel/traverse";
import { IPlagiarismDetector } from "./IPlagiarismDetector";
import { File } from "@babel/types";
import { Filter } from "./Filter";

const hasha = require("hasha");

/**
 * This is the concrete product of the Factory Pattern.
 * It implements the product interface IPlagiarismDetector.
 * The detector builds an AST of the program and traverses it to
 * build the 4-string representation.
 */
export class PlagiarismDetector implements IPlagiarismDetector {
  private AST: File;
  private stringStructures: ProgramString;

  constructor(
    private program: string,
    private filter: Array<Filter>,
    private name: string
  ) {
    this.stringStructures = new ProgramString(name);
    this.buildAST();
    this.buildProgramStringRepresentation();
  }

  /**
   * Build an AST for the program source using the Babel Parser.
   */
  buildAST(): void {
    this.AST = parse(this.program, {
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
  getAST(): File {
    return this.AST;
  }

  /**
   * Traverse the AST and build the 4-string representation.
   */
  buildProgramStringRepresentation(): void {
    let stringStructures = this.stringStructures;
    let filter = this.filter;
    let checkLoops = this.checkLoops;

    traverse(this.AST, {
      enter(path) {
        // populating the file structure
        if (!stringStructures.getLines().includes(path.node.loc.start.line)) {
          if (checkLoops(path.type)) path.type = "ForStatement";
          stringStructures.appendFileStructure(path.type);
          stringStructures.appendLine(path.node.loc.start.line);
        }

        // populating the identifiers
        if (
          path.node.type.includes("Identifier") &&
          !filter.includes(Filter.IGNORE_VARIABLE_NAMES)
        ) {
          stringStructures.appendIdentifiers(hasha(path.node.name));
        }

        // populating the literals
        if (
          path.node.type.includes("Literal") &&
          !filter.includes(Filter.IGNORE_LITERALS)
        ) {
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
  getStringRepresentation(): ProgramString {
    return this.stringStructures;
  }

  /**
   * Consider all loops to be the same.
   */
  checkLoops(node: string): boolean {
    return ["ForStatement", "WhileStatement", "DoWhileStatement"].includes(
      node
    );
  }
}
