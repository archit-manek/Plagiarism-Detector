import AST from "./AST";
import { FileType } from "./FileType";

class FileHandler {
  private file: File
  private language: FileType

  getFile(): File {
    throw new console.error("Method not implemented");
  }
  parseFile(file: File, language: FileType): AST {
    throw new console.error("Method not implemented");
  }
}