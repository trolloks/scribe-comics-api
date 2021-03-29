import jwt from 'jsonwebtoken';
import { Unauthorized } from '../common/errors';
import { Role } from '../core/auth/auth-types';

const { NODE_SECRET } = process.env;

interface AuthOptions {
   disabled?: boolean;
   minRoles?: Role[];
}

export default function authMiddleware(opts: AuthOptions = {}) {
   return async function auth(ctx: any, next: any) {
      const { disabled, minRoles } = opts;
      if (!disabled) {
         const { authorization } = ctx.request.headers;
         if (!authorization) {
            console.log('No auth headers');
            throw new Unauthorized();
         }

         try {
            const decoded = jwt.verify(authorization, NODE_SECRET as string);
            if (!decoded) {
               throw new Unauthorized();
            }
         } catch (err) {
            console.log(err);
            throw new Unauthorized();
         }


         const payload = jwt.decode(authorization, { json: true });
         if (!payload) {
            console.log('Could not decode jwt');
            throw new Unauthorized();
         }

         const { roles, email } = payload as any;
         if (minRoles && (!roles
            || (roles
            && !minRoles.some((i) => ((roles as string[]).some((j) => j === i)))))) {
            console.log('Role does not permit');
            throw new Unauthorized();
         }

         ctx.email = email;
         ctx.roles = roles;
      }

      await next();
   };
}
