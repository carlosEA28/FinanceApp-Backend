import { UnauthorizedError } from "../../errors/user.js";

export class RefreshTokenService {
  constructor(tokenGeneratorAdapter, tokenVerifierAdapter) {
    this.tokenGeneratorAdapter = tokenGeneratorAdapter;
    this.tokenVerifierAdapter = tokenVerifierAdapter;
  }

  execute(refreshToken) {
    try {
      const decodedToken = this.tokenVerifierAdapter.execute(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );

      return this.tokenGeneratorAdapter.execute(decodedToken.userId);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedError();
    }
  }
}
