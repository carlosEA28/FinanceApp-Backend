import { ZodError } from "zod";
import { loginSchema } from "../schemas/user.js";
import {
  badRequest,
  notFound,
  ok,
  serverError,
  unauthorized,
} from "./helpers/httpHelpers.js";
import { InvalidPasswordError, UserNotFoundError } from "../errors/user.js";

export class LoginUserController {
  constructor(loginUserService) {
    this.loginUserService = loginUserService;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      console.log("LoginUserController params:", params);

      await loginSchema.parseAsync(params);

      const user = await this.loginUserService.execute(
        params.email,
        params.password
      );

      return ok(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.errors[0].message,
        });
      }

      if (error instanceof InvalidPasswordError) {
        return unauthorized();
      }

      if (error instanceof UserNotFoundError) {
        return notFound({
          message: "User not found",
        });
      }

      return serverError();
    }
  }
}
