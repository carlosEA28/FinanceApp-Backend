import { CreateUserController } from "../controllers/create-user.js";

describe("Create User Controller", () => {
  //dummy class(stub)
  class CreateUserServiceStub {
    execute(user) {
      return user;
    }
  }

  it("should return 201 when creating a user ", async () => {
    //arrange
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: "Carlos Eduardo",
        last_name: "Alves Duarte",
        email: "cadu@gmail.com",
        password: "1234567",
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert

    expect(result.statusCode).toBe(201);
    expect(result.body).toBe(httpRequest.body);
  });

  it("should return 400 if first_name is not provided", async () => {
    //arrange
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        last_name: "Alves Duarte",
        email: "cadu@gmail.com",
        password: "1234567",
      },
    };
    //act

    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });
});
