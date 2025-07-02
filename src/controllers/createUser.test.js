import { CreateUserController } from "../controllers/create-user.js";
import { faker } from "@faker-js/faker"; //dados falsos para melhorar os testes

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
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 7,
        }),
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(httpRequest.body);
  });

  it("should return 400 if first_name is not provided", async () => {
    //arrange
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 7,
        }),
      },
    };
    //act

    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if last_name is not provided", async () => {
    //arrange
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        email: faker.internet.email,
        password: faker.internet.password({
          length: 7,
        }),
      },
    };
    //act

    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not provided", async () => {
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: faker.internet.password({
          length: 7,
        }),
      },
    };

    const result = await createUserController.execute(httpRequest);

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if the email is not valid", async () => {
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        email: "@gmail.com",
        last_name: faker.person.lastName(),
        password: faker.internet.password({
          length: 7,
        }),
      },
    };

    const result = await createUserController.execute(httpRequest);

    expect(result.statusCode).toBe(400);
  });
  it("should return 400 if the password is not provided", async () => {
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        email: faker.internet.email(),
        last_name: faker.person.lastName(),
      },
    };

    const result = await createUserController.execute(httpRequest);

    expect(result.statusCode).toBe(400);
  });
  it("should return 400 if the password is less than 6 characters", async () => {
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        email: faker.internet.email(),
        last_name: faker.person.lastName(),
        password: faker.internet.password({
          length: 5,
        }),
      },
    };

    const result = await createUserController.execute(httpRequest);

    expect(result.statusCode).toBe(400);
  });

  it("should call CreateUserServicec with correct params", async () => {
    //arrange
    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 7,
        }),
      },
    };

    const executeSpy = jest.spyOn(createUserService, "execute");

    //act

    await createUserController.execute(httpRequest);

    //assert

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it("should return 500 if CreateUserService throws", async () => {
    //arrange

    const createUserService = new CreateUserServiceStub();
    const createUserController = new CreateUserController(createUserService);

    const httpRequest = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 7,
        }),
      },
    };

    jest.spyOn(createUserService, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    //act

    const res = await createUserController.execute(httpRequest);

    //assert

    expect(res.statusCode).toBe(500);
  });
});
