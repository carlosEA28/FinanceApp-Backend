import { ok, serverError } from "./helpers/httpHelpers.js";
import { UnauthorizedError } from "../errors/user.js";

export class RefreshTokenController {
  constructor(refreshTokenService) {
    this.refreshTokenService = refreshTokenService;
  }
  execute(httpRequest) {
    try {
      const { refreshToken } = httpRequest.body;

      const newToken = this.refreshTokenService.execute(refreshToken);

      return ok(newToken);
    } catch (error) {
      console.log(error);

      if (error instanceof UnauthorizedError) {
        return unauthorized();
      }

      return serverError();
    }
  }
}
