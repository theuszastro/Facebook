import { Request, Response, NextFunction } from 'express';
import Busboy from 'busboy';

import BusboyConfig, { FilesType } from '../config/busboy';

export default async function busboyMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const { onField, onFile, onFinish } = BusboyConfig;

   const headers = req.headers['content-type'];
   const methods = ['POST', 'PUT'];

   const files: FilesType[] = [];

   if (methods.includes(req.method) && headers?.includes('multipart/form-data')) {
      const busboyInstance = new Busboy({ headers: req.headers });

      busboyInstance.on('file', (...rest) => onFile(rest[1], rest[4], files, req, res));
      busboyInstance.on('field', (...rest) => onField(rest[0], rest[1], req));
      busboyInstance.on('finish', () => onFinish(files, req, next));

      req.pipe(busboyInstance);
   } else {
      next();
   }
}
