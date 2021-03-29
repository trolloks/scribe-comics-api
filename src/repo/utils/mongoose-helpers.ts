/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
   Document as MongooseDocument,
   Schema,
   SchemaDefinition,
   model,
} from 'mongoose';

export interface Document extends MongooseDocument {
   createdAt: Date;
   updatedAt: Date;
}

export function wrapper<T extends Document>(
   name: string,
   schemaDefinition: SchemaDefinition,
) {
   const schema: Schema = new Schema(schemaDefinition, { timestamps: true });

   schemaDefinition.deleted = {};

   schema.set('toJSON', {
      transform(doc: any, ret: any) {
         // remove the _id of every document before returning the result
         if (ret._id) {
            ret.id = ret._id;
         }
         delete ret._id;
         delete ret.__v;
      },
   });

   return model<T>(name, schema);
}
