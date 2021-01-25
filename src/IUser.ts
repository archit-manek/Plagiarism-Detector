interface IUser {
  login(username: String, password: String): void
  logout(): void
  register(username: String, password: String, firstName: String, lastName: String): void
}