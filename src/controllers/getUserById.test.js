import { faker } from "@faker-js/faker";
import { GetUserByIdController } from "./get-user-by-id";

describe("GetUserByIdController", () => {
  class GetUserByIdStub {
    async execute() {
      return {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 7,
        }),
      };
    }
  }

  const makeSut = () => {
    const getUserByIdService = new GetUserByIdStub();
    const sut = new GetUserByIdController(getUserByIdService);

    return { sut, getUserByIdService };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
  };

  it("should return 200 if a user is found", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const res = await sut.execute({
      params: { userId: httpRequest.params.userId },
    });

    //assert
    expect(res.statusCode).toBe(200);
  });

  it("should return 400 if the provided id is not valid", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const res = await sut.execute({ params: { userId: "invalid_id" } });

    //assert
    expect(res.statusCode).toBe(400);
  });
});
