export class FindByIdUserCommand {
  public readonly id: string;

  constructor(command: FindByIdUserCommand) {
    this.id = command.id;
  }
}
