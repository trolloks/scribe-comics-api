// tried removing the es lint issues.
// but these need to run sequentially for now. otherwise it gives problems.

export async function asyncForEach(array: any[], callback: any) {
   for (let index = 0; index < array.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      await callback(array[index], index, array);
   }
}

export async function asyncMap(array: any[], callback: any) {
   const items = [];
   for (let index = 0; index < array.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      items.push(await callback(array[index], index, array));
   }
   return items;
}

export function groupBy(xs: any[], key: any) {
   return xs.reduce((rv: any, x: any) => {
      // eslint-disable-next-line no-param-reassign
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
   }, {});
}

export function streamToBuffer(stream: NodeJS.ReadableStream) {
   return new Promise((resolve, reject) => {
      const buffers: Buffer[] = [];
      stream.on('error', reject);
      stream.on('data', (data) => buffers.push(data));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
   });
}
