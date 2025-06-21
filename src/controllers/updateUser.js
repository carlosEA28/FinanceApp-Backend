import {
  badRequest,
  ok,
  serverError,
} from "../controllers/helpers/httpHelpers.js";
import { UpdateUserService } from "../service/updateUser.js";
import {
  checkIfEmailIsValid,
  generateEmailAlreadyInUse,
  generateInvalidPassowordResponse,
  invalidIdResponse,
  checkIfPasswordIsValid,
  checkIfIdIsValid,
} from "./helpers/userHelpers.js";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }
      const updateUserParams = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field)
      );

      if (someFieldIsNotAllowed) {
        return badRequest({ message: "Some provided field is not allowes" });
      }

      if (updateUserParams.password) {
        const passwordIsValid = checkIfPasswordIsValid(
          updateUserParams.password
        );
        if (!passwordIsValid) {
          return generateInvalidPassowordResponse();
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = checkIfEmailIsValid(updateUserParams.email);
        if (!emailIsValid) {
          return generateEmailAlreadyInUse();
        }
      }

      const updateUserService = new UpdateUserService();
      const updatedUser = await updateUserService.execute(
        userId,
        updateUserParams
      );
      return ok(updatedUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
