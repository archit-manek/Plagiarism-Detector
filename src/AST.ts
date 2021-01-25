import { FileType } from "./FileType"

class AST {
  private file: File
  private language: FileType

  getData(file: File, language: FileType): String {
    throw new console.error("Method not implemented");
  }
}

export default AST