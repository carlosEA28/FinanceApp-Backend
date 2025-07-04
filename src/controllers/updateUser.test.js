import { faker } from "@faker-js/faker";
import { UpdateUserController } from "./updateUser.js";

describe("UpdateUserController", () => {
  class UpdateUserServiceStub {
    async execute(user) {
      return user;
    }
  }
  const makeSut = () => {
    const updateUserService = new UpdateUserServiceStub();
    const sut = new UpdateUserController(updateUserService);

    return {
      sut,
      updateUserService,
    };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
    body: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 7,
      }),
    },
  };

  it("should return 200 when updating a user", async () => {
    // Arrange
    const { sut } = makeSut();

    //act
    const res = await sut.execute(httpRequest);

    //assert

    expect(res.statusCode).toBe(200);
  });

  it("should return 400 when email is invalid", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: httpRequest.params,
      body: { ...httpRequest.body, email: "invalid-email" },
    });

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if the password is less than 6 characters", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest,
        password: faker.internet.password({
          length: 5,
        }),
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if the id is invalid", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: {
        userId: "invalid-id",
      },
      body: httpRequest.body,
    });

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when unallowed fields is provided", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        unallowedField: "unallowedField",
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it("should return 500 if UpdateUserService throws with generic error", async () => {
    const { sut, updateUserService } = makeSut();
    jest.spyOn(updateUserService, "execute").mockRejectedValueOnce(() => {
      throw new Error();
    });

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(500);
  });
});
