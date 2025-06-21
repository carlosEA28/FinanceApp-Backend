import { badRequest, created, serverError } from "./helpers/httpHelpers.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  generateEmailAlreadyInUse,
  generateInvalidPassowordResponse,
} from "./helpers/userHelpers.js";

export class CreateUserController {
  constructor(createUserService) {
    this.createUserService = createUserService;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing Param ${field}` });
        }
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password);

      if (!passwordIsValid) {
        return generateInvalidPassowordResponse();
      }

      const emailIsValid = checkIfEmailIsValid(params.email);

      if (!emailIsValid) {
        return generateEmailAlreadyInUse();
      }

      const createdUser = await this.createUserService.execute(params);

      return created(createdUser);
    } catch (error) {
      console.error(error);

      return serverError("Internal server error");
    }
  }
}
