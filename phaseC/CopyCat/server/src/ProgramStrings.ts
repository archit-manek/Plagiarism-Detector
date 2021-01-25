/**
 * A class that represents an object which holds
 * all the 4 String Representation of a program.
 */
export class ProgramString {
  private name: string;
  private fileStructure: Array<string>;
  private lines: Array<number>;
  private identifiers: Array<string>;
  private literals: Array<string>;
  private tokens: Array<string>;

  constructor(name: string) {
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
  getName(): string {
    return this.name;
  }

  /**
   * Get the file structure of the program.
   */
  getFileStructure(): Array<string> {
    return this.fileStructure;
  }

  /**
   * Get the lines of the program.
   */
  getLines(): Array<number> {
    return this.lines;
  }

  /**
   * Get the Identifiers of the program.
   */
  getIdentifiers(): Array<string> {
    return this.identifiers;
  }

  /**
   * Get the Literals of the program.
   */
  getLiterals(): Array<string> {
    return this.literals;
  }

  /**
   * Get the Tokens of the program.
   */
  getTokens(): Array<string> {
    return this.tokens;
  }

  /**
   * Add the first token of a line to the File Structure list.
   */
  appendFileStructure(char: string): void {
    this.fileStructure.push(char);
  }

  /**
   * Add the current line of the program to the lines list.
   */
  appendLine(line: number): void {
    this.lines.push(line);
  }

  /**
   * Add an Identifier to the Identifiers list.
   */
  appendIdentifiers(char: string): void {
    this.identifiers.push(char);
  }

  /**
   * Add a Literal to the Literals list.
   */
  appendLiterals(char: string): void {
    this.literals.push(char);
  }

  /**
   * Add a Token to the Tokens list.
   */
  appendTokens(char: string): void {
    this.tokens.push(char);
  }

  /**
   * Gets all the strings of the program.
   */
  getAllStrings(): Array<string> {
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
  toString(): string {
    let out = "--------------------------------";
    out += "\n\nFile Structure: " + this.getFileStructure();
    out += "\n\nIdentifiers: " + this.getIdentifiers();
    out += "\n\nLiterals: " + this.getLiterals();
    out += "\n\nTokens: " + this.getTokens();
    out += "\n\n";
    return out;
  }
}
