// import { ZodError } from "zod/v4";
import { badRequest, created, serverError } from "./helpers/httpHelpers.js";
import { ZodError } from "zod";
import { createUserSchema } from "../schemas/user.js";

export class CreateUserController {
  constructor(createUserService) {
    this.createUserService = createUserService;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      await createUserSchema.parseAsync(params);

      const createdUser = await this.createUserService.execute(params);

      return created(createdUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.errors[0].message,
        });
      }
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
