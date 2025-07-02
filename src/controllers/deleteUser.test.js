import { faker } from "@faker-js/faker";
import { DeleteUserController } from "./deleteUser.js";

describe("DeleteUserController", () => {
  class DeleteUserServiceStub {
    execute() {
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
    const deleteUserService = new DeleteUserServiceStub();
    const sut = new DeleteUserController(deleteUserService);

    return { sut, deleteUserService };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
  };

  it("should return 200 when deleting a user ", async () => {
    //arrange
    const { sut } = makeSut();
    //act

    const res = await sut.execute(httpRequest);
    //assert

    expect(res.statusCode).toBe(200);
  });
});
