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
import * as issueCore from "./issue-core";
import { Issue } from "./issue-models";

const tag = tags(["Issue"]);

@prefix("/issue")
export default class IssueController {
  // List
  @request("get", "")
  @summary("List comic issues")
  @tag
  @query({
    volume: { type: "string", required: true },
    number: { type: "string", required: true },
  })
  @middlewares([authMiddleware({ minRoles: [Role.SUPERUSER] })])
  @responses({
    200: {
      description: "List of comic issues",
      schema: {
        type: "array",
        properties: (Issue as any).swaggerDocument,
      },
    },
    400: { description: "error" },
  })
  async listUsers(ctx: any) {
    const comics = await issueCore.listIssues(
      ctx.query.volume,
      ctx.query.number
    );
    ctx.response.status = 200;
    ctx.response.body = comics;
  }
}

export function issueController(router: SwaggerRouter) {
  router.map(IssueController, { doValidation: false });
}
