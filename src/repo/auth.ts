import AuthModel, { IAuth } from './models/Auth';
import { Auth } from '../core/auth/auth-models';

async function toAuth(auth: IAuth): Promise<Auth> {
   return {
      token: auth.token,
      role: auth.role,
   };
}

export async function getAuthByToken(token: string): Promise<Auth | null> {
   const results = await AuthModel.findOne({ token });
   if (results) {
      return await toAuth(results);
   }
   return null;
}
