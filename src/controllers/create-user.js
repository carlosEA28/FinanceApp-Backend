import { CreateUserService } from "../service/create-user.js";
import validator from "validator";
import { badRequest, created, serverError } from "./helper.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing Param ${field}` });
        }
      }

      if (params.password.length < 6) {
        return badRequest({
          message: "Password must be at least 6 characters",
        });
      }

      const emailIsValid = validator.isEmail(params.email);

      if (!emailIsValid) {
        return badRequest({
          message: "Invalid email, please provide a valid one",
        });
      }

      const createUserService = new CreateUserService();
      const createdUser = await createUserService.execute(params);

      return created(createdUser);
    } catch (error) {
      console.error(error);

      return serverError("Internal server error");
    }
  }
}
