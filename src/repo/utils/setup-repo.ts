import { connect } from 'mongoose';
import 'reflect-metadata';
import { seed as seedAdmin } from '../../core/auth/auth-core';

export default async function setupRepository() {
   const { NODE_ENV, DB_URI } = process.env;

   try {
      const connection = await connect(
         DB_URI as string,
         { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
      );
      if (NODE_ENV === 'development') {
         console.log('connected to mongo dev');
      } else {
         console.log('connected to mongo prod');
      }
      // Create admin user on startup.  This way seed admin is not available on Swagger.
      try {
         console.log('seeding admin...');
         const adminToken = await seedAdmin();
         console.log(`The admin user's token is: ${adminToken}`);
      } catch (err) {
         // admin already exists
         console.log(`The admin user's token is: ${err.message || err}`);
      }

      connection.set('useFindAndModify', false);
      return connection;
   } catch (err) {
      console.error('Could not connect to MongoDB');
      throw err;
   }
}
