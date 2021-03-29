import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator-trolloks';

@swaggerClass()
export class RequestUser {
   @swaggerProperty({ type: 'string' })
   email: string;

   @swaggerProperty({ type: 'string' })
   password: string;
}

@swaggerClass()
export class UserViewModel {
   email: string;

   roles?: string[];
}

@swaggerClass()
export class User {
   passwordHash: string;

   email: string;

   id?: string;

   roles?: string[];

   lastLoggedIn?: Date;
}
