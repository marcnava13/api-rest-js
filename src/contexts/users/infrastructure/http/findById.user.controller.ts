import { Inject, Route } from "../../../../shared/decorators";
import {
  ApiRequest,
  ApiResponse,
  HttpController,
} from "../../../../shared/types";
import { FindByIdUserCommand } from "../../application/query/findByIdUser/findById.user.query";
import { FindByIdUserQueryHandler } from "../../application/query/findByIdUser/findById.user.query.handler";

@Route("/users/:id", "get")
export default class FindByIdUserController implements HttpController {
  @Inject("Users_FindByIdUserQueryHandler")
  private readonly findByIdUserQueryHandler!: FindByIdUserQueryHandler;

  async handle(req: ApiRequest, res: ApiResponse): Promise<void> {
    const user = await this.findByIdUserQueryHandler.handler(
      new FindByIdUserCommand({
        id: req.params.id,
      })
    );

    res.json(user!.serialize());
  }
}
