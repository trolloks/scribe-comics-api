import { SwaggerRouter } from "koa-swagger-decorator-trolloks";
import { userController } from "../core/user/user-controllers";
import { authController } from "../core/auth/auth-controllers";
import { volumeController } from "../core/volume/volume-controllers";
import { issueController } from "../core/issue/issue-controllers";

export function configureControllers(router: SwaggerRouter) {
  userController(router);
  authController(router);
  volumeController(router);
  issueController(router);
}
