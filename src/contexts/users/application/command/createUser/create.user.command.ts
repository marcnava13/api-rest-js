export class CreateUserCommand {
  public readonly id: string;
  public readonly email: string;

  constructor(command: CreateUserCommand) {
    this.id = command.id;
    this.email = command.email;
  }
}
