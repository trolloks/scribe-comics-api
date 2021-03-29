// node-modules
import asyncBusboy from 'async-busboy';
import { streamToBuffer } from '../utils/utils';

interface MultipartOptions {}
export interface IFile {
   filename: string;
   mimetype: string;
   encoding: string;
   data: Buffer;
}

export default function multipartMiddleware(opts: MultipartOptions = {}) {
   return async function multpart(ctx: any, next: any) {

      await asyncBusboy(ctx.req, {
         onFile: async function(fieldname, file, filename, encoding, mimetype) {
            const data = await streamToBuffer(file);
            ctx.file = { filename, mimetype, encoding, data } as IFile;
         }
      });

      await next();
   };
}
