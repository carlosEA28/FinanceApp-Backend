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

export class InvalidPasswordError extends Error {
  constructor() {
    super(`The provided password is not valid`);
    this.name = "InvalidPasswordError";
  }
}
export class ForbidenError extends Error {
  constructor() {
    super(`You are not allowed to perform this action`);
    this.name = "ForbidenError";
  }
}
