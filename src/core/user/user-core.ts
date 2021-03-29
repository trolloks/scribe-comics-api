import { UserViewModel } from './user-models';
import * as userRepo from '../../repo/user';

// TODO: Should only show users that share a role requesting user
export async function listUsers(): Promise<UserViewModel[]> {
   const dataUsers = await userRepo.listUsers();
   if (dataUsers) {
      return dataUsers.map((i) => ({
         email: i.email,
         roles: i.roles,
      }));
   }
   return [];
}
