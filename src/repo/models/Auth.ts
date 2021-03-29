import { SchemaDefinition } from 'mongoose';
import { wrapper, Document } from '../utils/mongoose-helpers';
import { Role } from '../../core/auth/auth-types';

export interface IAuth extends Document {
   token: string;
   role: Role;
}

const AuthSchema: SchemaDefinition = {
   token: { type: String },
   role: {
      type: String,
      enum: Object.values(Role),
   },
};

export default wrapper<IAuth>('Auth', AuthSchema);
