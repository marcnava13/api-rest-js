import { Injectable } from "../../../../shared/decorators";
import { sleep } from "../../../../shared/utils";
import { CreateUserDto, User } from "../../domain/user.model";
import { UserRepository } from "../../domain/user.repository";

@Injectable("Users_InMemoryUsersRepository")
export class InMemoryUsersRepository implements UserRepository {
  private readonly users: User[] = [];
  public static _instance: InMemoryUsersRepository;

  constructor() {
    if (InMemoryUsersRepository._instance) {
      return InMemoryUsersRepository._instance;
    } else {
      InMemoryUsersRepository._instance = this;
    }
  }

  public async create(user: CreateUserDto): Promise<void> {
    const date = new Date();

    this.users.push(
      new User({
        id: user.id,
        email: user.email,
        createdAt: date,
        updatedAt: date,
      })
    );
  }

  public async findBy(userId: string): Promise<User | undefined> {
    await sleep();
    return this.users.find(({ id }) => id === userId);
  }
}
