import { faker } from "@faker-js/faker";
import { LoginUserService } from "./loginUser.js";
import { InvalidPasswordError, UserNotFoundError } from "../../errors/user.js";

describe("LoginUserService", () => {
  class GetUserByEmailStub {
    async execute() {
      return {
        user_id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
    }
  }

  class PasswordComparatorAdapterStub {
    async execute() {
      return true;
    }
  }

  class TokenGeneratorAdapterStub {
    async execute() {
      return {
        accessToken: "any_token",
        refreshToken: "any_token",
      };
    }
  }

  const makeSut = () => {
    const getUserByEmailRepository = new GetUserByEmailStub();
    const tokenGeneratorAdapter = new TokenGeneratorAdapterStub();
    const passwordComparatorAdapter = new PasswordComparatorAdapterStub();
    const sut = new LoginUserService(
      getUserByEmailRepository,
      passwordComparatorAdapter,
      tokenGeneratorAdapter
    );

    return {
      getUserByEmailRepository,
      passwordComparatorAdapter,
      sut,
      tokenGeneratorAdapter,
    };
  };

  it("should throw UserNotFoundError if user is not found", async () => {
    const { sut, getUserByEmailRepository } = makeSut();

    jest.spyOn(getUserByEmailRepository, "execute").mockResolvedValueOnce(null);

    const promise = sut.execute("email", "password");

    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });

  it("shold throw InvalidPasswordError if password is invalid", async () => {
    const { sut, passwordComparatorAdapter } = makeSut();

    jest.spyOn(passwordComparatorAdapter, "execute").mockReturnValue(false);

    const promise = sut.execute("email", "password");

    await expect(promise).rejects.toThrow(new InvalidPasswordError());
  });

  it("should return user with tokens", async () => {
    const { sut } = makeSut();

    const res = await sut.execute("email", "password");

    expect(res.tokens.accessToken).toBeDefined();
  });
});
