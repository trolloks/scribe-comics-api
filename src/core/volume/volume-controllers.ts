import {
  SwaggerRouter,
  request,
  summary,
  prefix,
  tags,
  responses,
  middlewares,
  query,
} from "koa-swagger-decorator-trolloks";
import authMiddleware from "../../server/auth-middleware";
import { Role } from "../auth/auth-types";
import * as comicCore from "./volume-core";
import { Volume } from "./volume-models";

const tag = tags(["Volume"]);

@prefix("/volume")
export default class VolumeController {
  // List
  @request("get", "")
  @summary("List comic volumes")
  @tag
  @query({
    name: { type: "string", required: true },
    year: { type: "string" },
    publisher: { type: "string" },
  })
  @middlewares([authMiddleware({ minRoles: [Role.SUPERUSER] })])
  @responses({
    200: {
      description: "List of comic volumes",
      schema: {
        type: "array",
        properties: (Volume as any).swaggerDocument,
      },
    },
    400: { description: "error" },
  })
  async listUsers(ctx: any) {
    const comics = await comicCore.listVolumes(
      ctx.query.name,
      ctx.query.year,
      ctx.query.publisher
    );
    ctx.response.status = 200;
    ctx.response.body = comics;
  }
}

export function volumeController(router: SwaggerRouter) {
  router.map(VolumeController, { doValidation: false });
}
