import jwt from "jsonwebtoken";

export class TokenVerifier {
  execute(token, secret) {
    return jwt.verify(token, secret);
  }
}
