import { SchemaDefinition } from 'mongoose';
import { wrapper, Document } from '../utils/mongoose-helpers';

export interface IUser extends Document {
   id: string;
   email: string;
   roles?: string[];
   passwordHash: string;
   lastLoggedIn?: Date;
}

const UserSchema: SchemaDefinition = {
   id: { type: String },
   email: { type: String },
   roles: { default: undefined, type: [{ type: String }] },
   passwordHash: { type: String },
   lastLoggedIn: { default: undefined, type: Date },
};

export default wrapper<IUser>('User', UserSchema);
