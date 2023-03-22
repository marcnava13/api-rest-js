import { Inject, Injectable } from "../../../../../shared/decorators";
import { User } from "../../../domain/user.model";
// import { UserRepository } from "../../../domain/user.repository";
import { InMemoryUsersRepository } from "../../../infrastructure/repositories/inMemory.users.repository";
import { FindByIdUserCommand } from "./findById.user.query";

@Injectable("Users_FindByIdUserQueryHandler")
export class FindByIdUserQueryHandler {
  @Inject("Users_InMemoryUsersRepository")
  private readonly usersRepository!: InMemoryUsersRepository;

  async handler(command: FindByIdUserCommand): Promise<User> {
    const user = await this.usersRepository.findByIdUser(command.id);

    return user!;
  }
}
