import { DeleteUserService } from "../service/deleteUser.js";
import { notFound, ok, serverError } from "./helpers/httpHelpers.js";
import { checkIfIdIsValid, invalidIdResponse } from "./helpers/userHelpers.js";

export class DeleteUserController {
  constructor(deleteUserService) {
    this.deleteUserService = deleteUserService;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deletedUser = await this.deleteUserService.execute(userId);

      if (!deletedUser) {
        return notFound({
          message: "User Not Found",
        });
      }

      return ok(deletedUser);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
