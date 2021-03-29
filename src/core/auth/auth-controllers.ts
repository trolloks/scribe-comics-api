import {
   SwaggerRouter, request, summary, prefix, tags, body, responses,
} from 'koa-swagger-decorator-trolloks';
import { RequestUser } from '../user/user-models';
import * as authCore from './auth-core';

const tag = tags(['Auth']);

@prefix('/auth')
export default class AuthController {
   // List
   @request('post', '/seed')
   @summary('Seed')
   @tag
   @responses({
      200: {
         description: 'Seeded a default admin user',
      },
      400: { description: 'error' },
   })
   async seed(ctx: any) {
      const token = await authCore.seed();
      ctx.response.status = 200;
      ctx.response.body = token;
   }

   // List
   @request('post', '/register')
   @summary('Register')
   @tag
   @body({ type: 'object', properties: (RequestUser as any).swaggerDocument })
   @responses({
      200: {
         description: 'User Registered Successfully',
      },
      400: { description: 'error' },
   })
   async register(ctx: any) {
      const token = await authCore.register(ctx.request.body as RequestUser);
      ctx.response.status = 200;
      ctx.response.body = token;
   }

   // List
   @request('post', '/login')
   @summary('Login')
   @tag
   @body({ type: 'object', properties: (RequestUser as any).swaggerDocument })
   @responses({
      200: {
         description: 'User Login Successfully',
      },
      400: { description: 'error' },
   })
   async login(ctx: any) {
      const token = await authCore.login(ctx.request.body as RequestUser);
      ctx.response.status = 200;
      ctx.response.body = token;
   }
}


export function authController(router: SwaggerRouter) {
   router.map(AuthController, { doValidation: false });
}
