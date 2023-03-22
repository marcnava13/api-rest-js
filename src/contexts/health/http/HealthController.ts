import { RedisCacheManager } from "../../../shared/cache.manager";
import { Inject, Route } from "../../../shared/decorators";
import { HttpController } from "../../../shared/types";

@Route("/health")
export default class HealthController implements HttpController {
  @Inject("RedisCacheManager")
  private readonly redisCacheManager!: RedisCacheManager;

  public async handle(_: any, res: any) {
    const isHealthyRedis = await this.redisCacheManager.isHealthy();
    await this.redisCacheManager.close();

    res.json({
      redis: isHealthyRedis,
    });
  }
}
