import { SwaggerRouter } from "koa-swagger-decorator-trolloks";
import { userController } from "../core/user/user-controllers";
import { authController } from "../core/auth/auth-controllers";

export function configureControllers(router: SwaggerRouter) {
  userController(router);
  authController(router);
}
