export type CreateUserDto = Pick<User, "id" | "email">;

export class User {
  public id: string;
  public email: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor({
    id,
    email,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: {
    id: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  serialize(): {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt!,
      updatedAt: this.updatedAt!,
    };
  }
}
