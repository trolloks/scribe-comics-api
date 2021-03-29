import forge from 'node-forge';
import jwt from 'jsonwebtoken';
import * as authRepo from '../../repo/auth';
import * as userRepo from '../../repo/user';
import { Auth } from './auth-models';
import { RequestUser, User } from '../user/user-models';
import { BadRequest } from '../../common/errors';
import { validateEmail } from '../../common/utils';

const { NODE_SECRET } = process.env;

export const ADMIN_USER = {
   email: 'admin@admin.com',
   password: 'admin',
};

function generateToken(user: User): string {
   const { email, roles } = user;
   return jwt.sign(/* payload */{
      email,
      roles,
   }, NODE_SECRET as string, { expiresIn: '24h' });
}

export async function getAuthByToken(token: string): Promise<Auth | null> {
   return await authRepo.getAuthByToken(token);
}

export async function register(requestUser: RequestUser, roles?: string[]): Promise<string> {
   if (!requestUser.email || !validateEmail(requestUser.email)) {
      throw new BadRequest('Invalid email address');
   }
   const email = requestUser.email.toLowerCase();
   const existingUser = await userRepo.getUserByEmail(email);
   if (existingUser) {
      throw new BadRequest('User already exists');
   }

   const md = forge.md.sha256.create();
   md.update(requestUser.password);

   const user = await userRepo.createUser({
      email,
      passwordHash: md.digest().toHex(),
      roles: roles || ['user'],
   });

   if (user) {
      return generateToken(user);
   }
   throw new BadRequest();
}

export async function login(requestUser: RequestUser): Promise<string> {
   if (!requestUser.email || !validateEmail(requestUser.email)) {
      throw new BadRequest('Invalid email address');
   }
   const email = requestUser.email.toLowerCase();
   const existingUser = await userRepo.getUserByEmail(email);
   if (!existingUser) {
      throw new BadRequest('User doesn\'t exist');
   }

   const md = forge.md.sha256.create();
   md.update(requestUser.password);

   if (md.digest().toHex() === existingUser.passwordHash) {
      existingUser.lastLoggedIn = new Date();
      existingUser.email = email;
      await userRepo.updateUser(existingUser);
      return generateToken(existingUser);
   }
   throw new BadRequest();
}

export async function seed(): Promise<string> {
   const adminUser = await userRepo.getAdminUser();
   if (adminUser) {
      throw new BadRequest(await login(ADMIN_USER));
   }

   return await register(ADMIN_USER, ['sudo']);
}

export async function setRole(email: string, role: string) {
   if (!email || !validateEmail(email)) {
      throw new BadRequest('Invalid email address');
   }
   const emailIgnoreCase = email.toLowerCase();
   const existingUser = await userRepo.getUserByEmail(emailIgnoreCase);
   if (!existingUser) {
      throw new BadRequest('User doesn\'t exist');
   }
   if (!existingUser.roles) {
      existingUser.roles = [];
   }
   existingUser.roles = [...existingUser.roles, role];
   await userRepo.createUser(existingUser);
}
