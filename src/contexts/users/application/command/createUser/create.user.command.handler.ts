import { Inject, Injectable } from "../../../../../shared/decorators";
// import { UserRepository } from "../../../domain/user.repository";
import { InMemoryUsersRepository } from "../../../infrastructure/repositories/inMemory.users.repository";
import { CreateUserCommand } from "./create.user.command";

@Injectable("Users_CreateUserCommandHandler")
export class CreateUserCommandHandler {
  @Inject("Users_InMemoryUsersRepository")
  private readonly usersRepository!: InMemoryUsersRepository;

  async handler(command: CreateUserCommand) {
    await this.usersRepository.create({
      id: command.id,
      email: command.email,
    });
  }
}
