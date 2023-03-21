import { Route } from "../../../shared/decorators";
import { HttpController } from "../../../shared/types";

@Route("/sample")
export default class SampleController implements HttpController {
  public async handle(_: any, res: any) {
    res.json({ hello: "world" });
  }
}
