import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { SwaggerRouter } from 'koa-swagger-decorator-trolloks';
import errorHandler from './error-handler';
import { configureSwaggerPlugin } from '../plugins';
import { configureControllers } from './controllers';

import yargsParser = require('yargs-parser');

// Process command line arguments and environment variables
const argv = yargsParser(process.argv.slice(2));

const log = typeof argv.log === 'boolean'
   ? argv.log : JSON.stringify(process.env.NODE_ENV) === 'development';

export default function createServer(port: number) {
   const koa = new Koa();
   const router = new SwaggerRouter();

   configureSwaggerPlugin(router);
   configureControllers(router);

   koa
      .use(bodyParser({
         enableTypes: ['text', 'json', 'form'],
      }))
      .use(cors({
         origin: '*',
      }))
      .use(errorHandler())
      .use(router.routes())
      .use(router.allowedMethods());

   console.log(`logging enabled - ${log}`);
   if (log) {
      koa.use(logger());
   }

   router.get('/', (ctx) => {
      ctx.body = {
         date: new Date().toString(),
         port,
         NODE_ENV: process.env.NODE_ENV,
      };
   });

   try {
      koa.listen(port, process.env.address || '0.0.0.0');
      // fastify.log.info(`mtgspellbook-api started on port ${port}`)
   } catch (err) {
      // fastify.log.error(err)
      process.exit(1);
   }

   return koa;
}
