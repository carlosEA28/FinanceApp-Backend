import { faker } from "@faker-js/faker";
import { LoginUserController } from "./loginUser.js";
import { InvalidPasswordError, UserNotFoundError } from "../errors/user.js";

describe("LoginUserController", () => {
  class LoginUserServiceStub {
    async execute() {
      return {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 7,
        }),
        tokens: {
          accessToken: "any_access_token",
          refreshToken: "any_refresh_token",
        },
      };
    }
  }

  const makeSut = () => {
    const loginUserService = new LoginUserServiceStub();
    const sut = new LoginUserController(loginUserService);

    return {
      sut,
      loginUserService,
    };
  };

  const httpRequest = {
    body: {
      email: "a@a.com",
      password: "wrongpassword",
    },
  };

  it("should return 200 with user and tokens", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.tokens.accessToken).toBe("any_access_token");
    expect(response.body.tokens.refreshToken).toBe("any_refresh_token");
  });

  it("should return 401 if password is invalid", async () => {
    const { sut, loginUserService } = makeSut();

    jest
      .spyOn(loginUserService, "execute")
      .mockRejectedValueOnce(new InvalidPasswordError());

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(401);
  });

  it("should return 404 if user is not found", async () => {
    const { sut, loginUserService } = makeSut();

    jest
      .spyOn(loginUserService, "execute")
      .mockRejectedValueOnce(new UserNotFoundError());

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(404);
  });
});
