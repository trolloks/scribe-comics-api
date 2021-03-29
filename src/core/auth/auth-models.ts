import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator-trolloks';
import { Role } from './auth-types';

@swaggerClass()
export class Auth {
   @swaggerProperty({ type: 'string', required: true })
   token: string;

   @swaggerProperty({ type: 'string', required: false, example: Object.values(Role) })
   role: Role;
}
