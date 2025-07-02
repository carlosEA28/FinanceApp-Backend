export class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User with id ${userId} not found`);
    this.name = "UserNotFoundError";
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`The email ${email} its already in use`);
    this.name = "EmailAlreadyInUseError";
  }
}
