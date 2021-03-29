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
import { UserViewModel } from "./user-models";
import * as userCore from "./user-core";

const tag = tags(["Users"]);

@prefix("/user")
export default class UserController {
  // List
  @request("get", "")
  @summary("List all users")
  @tag
  @middlewares([authMiddleware({ minRoles: [Role.SUPERUSER] })])
  @responses({
    200: {
      description: "All users",
      schema: {
        type: "array",
        properties: (UserViewModel as any).swaggerDocument,
      },
    },
    400: { description: "error" },
  })
  async listUsers(ctx: any) {
    const users = await userCore.listUsers();
    ctx.response.status = 200;
    ctx.response.body = users;
  }
}

export function userController(router: SwaggerRouter) {
  router.map(UserController, { doValidation: false });
}
