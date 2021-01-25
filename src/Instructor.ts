class Instructor implements IUser {

  private username: String
  private password: String
  private firstName: String
  private lastName: String

  login(username: String, password: String): void {
    throw new Error("Method not implemented.");
  }
  logout(): void {
    throw new Error("Method not implemented.");
  }
  register(username: String, password: String, firstName: String, lastName: String): void {
    throw new Error("Method not implemented.");
  }

}