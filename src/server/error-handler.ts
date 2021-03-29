import {
   InvalidArgument, BadRequest, NotFound, Unauthorized,
} from '../common/errors';

export default function errorMiddleware() {
   return async function errorHandler(ctx: any, next: any) {
      try {
         await next();
      } catch (error) {
         console.log(error);
         if (error.name === InvalidArgument.name) {
            error.status = 400;
         } else if (error.name === BadRequest.name) {
            error.status = 400;
         } else if (error.name === NotFound.name) {
            error.status = 404;
         } else if (error.name === Unauthorized.name) {
            error.status = 401;
         } else if (error.message) {
            console.error('Might be 500!');
            error.status = 400;
         } else {
            error.status = 500;
         }
         throw error;
      }
   };
}
