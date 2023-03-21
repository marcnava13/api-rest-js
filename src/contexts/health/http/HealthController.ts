import { Route } from "../../../shared/decorators";
import { HttpController } from "../../../shared/types";

@Route("/health")
export default class HealthController implements HttpController {
  public async handle(_: any, res: any) {
    res.json();
  }
}
