import { faker } from "@faker-js/faker";
import { GetUserBalanceController } from "./getUserBalance.js";

describe("GetUserBalance", () => {
  class GetUserBalanceStub {
    async execute() {
      return faker.number.int();
    }
  }

  const makeSut = () => {
    const getUserBalanceService = new GetUserBalanceStub();
    const sut = new GetUserBalanceController(getUserBalanceService);

    return { sut, getUserBalanceService };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
  };

  it("should return 200 when getting user balance", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const res = await sut.execute(httpRequest);

    //assert
    expect(res.statusCode).toBe(200);
  });

  it("should return 400 when user id is invalid", async () => {
    //arrange
    const { sut } = makeSut();

    //act

    const res = await sut.execute({ params: { userId: "invalid_userId" } });

    //assert

    expect(res.statusCode).toBe(400);
  });
});
