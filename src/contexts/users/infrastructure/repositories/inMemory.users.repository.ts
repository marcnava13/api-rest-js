import { Injectable } from "../../../../shared/decorators";
import { InMemoryRepository } from "../../../../shared/respositories/inMemory.repository";
import { CreateUserDto, User } from "../../domain/user.model";
import { UserRepository } from "../../domain/user.repository";

@Injectable("Users_InMemoryUsersRepository")
export class InMemoryUsersRepository
  extends InMemoryRepository<User>
  implements UserRepository
{
  public async createUser(user: CreateUserDto): Promise<void> {
    const date = new Date();

    await this.create(
      new User({
        id: user.id,
        email: user.email,
        createdAt: date,
        updatedAt: date,
      })
    );
  }

  public async findByIdUser(userId: string): Promise<User | undefined> {
    return await this.findById(userId);
  }
}
