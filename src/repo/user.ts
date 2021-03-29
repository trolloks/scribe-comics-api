import { User } from '../core/user/user-models';
import UserModel, { IUser } from './models/User';
import { ADMIN_USER } from '../core/auth/auth-core';

function toUser(user: IUser): User {
   const actualUser: User = {
      id: user._id,
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
      lastLoggedIn: user.lastLoggedIn,
   };

   return actualUser;
}

export async function createUser(user: User): Promise<User | null> {
   const existingUser = await UserModel.findById(user.id);
   if (existingUser) {
      return null;
   }
   const createdUser = await UserModel.create({
      ...user,
   });
   return toUser(createdUser);
}

export async function updateUser(user: User): Promise<User | null> {
   const existingUser = await UserModel.findById(user.id);
   if (!existingUser) {
      return null;
   }
   const updatedUser = await UserModel.findByIdAndUpdate(user.id, {
      ...user,
   }, { new: true });

   if (!updatedUser) {
      return null;
   }
   return toUser(updatedUser);
}

export async function getUserById(id: string): Promise<User | null> {
   const existingUser = await UserModel.findById(id);
   return existingUser && toUser(existingUser);
}

export async function getUserByEmail(email: string): Promise<User | null> {
   const existingUser = await UserModel.findOne({ email });
   return existingUser && toUser(existingUser);
}

export async function listUsers(): Promise<User[]> {
   const existingUsers = await UserModel.find();
   return existingUsers.map((existingUser) => toUser(existingUser));
}

export async function getAdminUser(): Promise<User | null> {
   const adminUser = await UserModel.findOne({ email: ADMIN_USER.email });
   return adminUser && toUser(adminUser);
}

export async function removeAll(): Promise<void> {
   await UserModel.deleteMany({});
}
