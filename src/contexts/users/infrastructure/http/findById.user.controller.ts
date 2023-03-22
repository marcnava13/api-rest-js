import { RedisCacheManager } from "../../../../shared/cache.manager";
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

  @Inject("RedisCacheManager")
  private readonly redisCacheManager!: RedisCacheManager;

  async handle(req: ApiRequest, res: ApiResponse): Promise<void> {
    const userId = req.params.id;
    const key = `Users_FindByIdUser__handler__${userId}`;
    const cachedValue = await this.redisCacheManager.get(key);

    if (cachedValue) {
      res.json(cachedValue);
      return;
    }

    const user = await this.findByIdUserQueryHandler.handler(
      new FindByIdUserCommand({
        id: userId,
      })
    );

    await this.redisCacheManager.set(key, user, {
      expirationMs: 60000,
    });

    res.json(user!.serialize());
  }
}
