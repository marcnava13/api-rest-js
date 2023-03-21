import { CreateUserDto, User } from "./user.model";

export abstract class UserRepository {
  abstract create: (user: CreateUserDto) => Promise<void>;
  abstract findBy: (userId: User["id"]) => Promise<User | undefined>;
}
