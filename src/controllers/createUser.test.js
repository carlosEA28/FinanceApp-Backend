import { CreateUserController } from "../controllers/create-user.js";
import { faker } from "@faker-js/faker"; //dados falsos para melhorar os testes
import { EmailAlreadyInUseError } from "../errors/user.js";

describe("Create User Controller", () => {
  //dummy class(stub)
  class CreateUserServiceStub {
    execute(user) {
      return user;
    }
  }

  const makeSut = () => {
    const createUserService = new CreateUserServiceStub();
    const sut = new CreateUserController(createUserService);

    return { createUserService, sut };
  };

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

  it("should return 201 when creating a user ", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(httpRequest);

    //assert

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(httpRequest.body);
  });

  it("should return 400 if first_name is not provided", async () => {
    //arrange
    const { sut } = makeSut();

    //act

    const result = await sut.execute({
      body: { ...httpRequest, first_name: undefined },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if last_name is not provided", async () => {
    //arrange
    const { sut } = makeSut();

    //act

    const result = await sut.execute({
      body: { ...httpRequest, last_name: undefined },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not provided", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      body: { ...httpRequest, email: undefined },
    });

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if the email is not valid", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      body: { ...httpRequest, email: "invalid_email" },
    });

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if the password is not provided", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      body: { ...httpRequest, password: undefined },
    });

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if the password is less than 6 characters", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      body: {
        ...httpRequest,
        password: faker.internet.password({
          length: 5,
        }),
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it("should call CreateUserServicec with correct params", async () => {
    //arrange
    const { sut, createUserService } = makeSut();

    const executeSpy = jest.spyOn(createUserService, "execute");

    //act

    await sut.execute(httpRequest);

    //assert

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it("should return 500 if CreateUserService throws", async () => {
    //arrange

    const { sut, createUserService } = makeSut();

    jest.spyOn(createUserService, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    //act

    const res = await sut.execute(httpRequest);

    //assert

    expect(res.statusCode).toBe(500);
  });

  it("should return 500 if CreateUserService throws EmailAlreadyInUse error", async () => {
    //arrange

    const { sut, createUserService } = makeSut();
    jest.spyOn(createUserService, "execute").mockImplementationOnce(() => {
      throw new EmailAlreadyInUseError(httpRequest.body.email);
    });

    //act

    const res = await sut.execute(httpRequest);

    //assert

    expect(res.statusCode).toBe(400);
  });
});
