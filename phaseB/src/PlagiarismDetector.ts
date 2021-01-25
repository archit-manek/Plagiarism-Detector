import { FileType } from "./FileType";
import AST from './AST';

class PlagiarismDetector {
  private users: String[]
  private selectedLanguage: FileType
  private filterCriteria: String[]
  private programOneAST: AST
  private programTwoAST: AST
  private programOne: File
  private programTwo: File
  private results: String

  getSelectedLanguage(): FileType {
    throw new console.error("Method not implemented");
  }

  getInputFile(): File {
    throw new console.error("Method not implments");
  }

  generateAST(file: File, language: FileType): AST {
    throw new console.error("Method not implemented");
  }

  compare(programOneAST: AST, programTwoAST: AST, filterCriteria: String[]): String {
    throw new console.error("Method not implemented");
  }

  generateReport(results: String): File {
    throw new console.error("Method not implemented");
  }

  calculatePercentage(results: String): number {
    throw new console.error("Method not implemented");
  }
}

export default PlagiarismDetector
