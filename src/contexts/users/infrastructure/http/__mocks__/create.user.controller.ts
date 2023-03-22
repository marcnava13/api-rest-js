import { Inject, Route } from "../../../../../shared/decorators";
import {
  ApiRequest,
  ApiResponse,
  HttpController,
} from "../../../../../shared/types";
import { CreateUserCommand } from "../../../application/command/createUser/create.user.command";
import { CreateUserCommandHandler } from "../../../application/command/createUser/create.user.command.handler";

@Route("/users", "post")
export default class CreateUserController implements HttpController {
  @Inject("Users_CreateUserCommandHandler")
  private readonly createUserCommandHandler!: CreateUserCommandHandler;

  async handle(req: ApiRequest, res: ApiResponse): Promise<void> {
    await this.createUserCommandHandler.handler(
      new CreateUserCommand({
        id: req.body.id,
        email: req.body.email,
      })
    );
    res.status(201);
  }
}
