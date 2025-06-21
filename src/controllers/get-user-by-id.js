import { GetUserByIdService } from "../service/get-user-by-id.js";
import { badRequest, ok, serverError } from "./helper.js";

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isIdValid = validator.isUUID(httpRequest.params.userId);
      if (!isIdValid) {
        return badRequest({
          message: "The provided id is not valid",
        });
      }

      const getUserByIdService = new GetUserByIdService();

      const user = await getUserByIdService.execute(httpRequest.params.userId);

      return ok(user);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
