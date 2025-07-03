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
      UpdateUserServiceStub,
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
});
