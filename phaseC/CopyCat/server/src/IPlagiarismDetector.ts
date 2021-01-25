import { ProgramString } from "./ProgramStrings";

/**
* This is the product interface of the Factory Pattern.
* The detector builds an AST of the program and traverses it to
* build the 4-string representation.
*/
export interface IPlagiarismDetector {

  /**
  * Build an AST for the program source using the Babel Parser.
  */
  buildAST(): void

  /**
  * Traverse the AST and build the 4-string representation.
  */
  buildProgramStringRepresentation(): void

  /**
  * Get all 4 string representations with an instance of the ProgramString.
  */
  getStringRepresentation(): ProgramString
}