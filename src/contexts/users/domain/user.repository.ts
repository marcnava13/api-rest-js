import { CreateUserDto, User } from "./user.model";

export abstract class UserRepository {
  abstract createUser: (user: CreateUserDto) => Promise<void>;
  abstract findByIdUser: (userId: User["id"]) => Promise<User | undefined>;
}
