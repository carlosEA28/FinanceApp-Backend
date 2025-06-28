export class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User with id ${userId} not found`);
    this.name = "UserNotFoundError";
  }
}
