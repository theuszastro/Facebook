import { Request, Response, NextFunction } from 'express';

import random from 'crypto-random-string';

import fs from 'fs';
import path from 'path';

interface FilesType {
   filename: string;
   isVideo: boolean;
}

class BusboyActions {
   onFile (file: NodeJS.ReadableStream, mimetype: string, files: FilesType[], res: Response) {
      let mimetypeAllowed = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'video/mp4',
			'video/mpeg',
		];

      let hash = random({ length: 30 });
      let date = Date.now();
      let name = `${hash}-${date}.${mimetype.split('/')[1]}`;
      let saveTo = path.join(__dirname, '../../../uploads', name);

      if (mimetypeAllowed.includes(mimetype)) {
         files.push({ filename: name, isVideo: mimetype === 'video/mp4' || mimetype === 'video/mpeg' });

         file.pipe(fs.createWriteStream(saveTo));
      } else {
         return res.status(400).json({ error: 'formato de arquivo não aceitado!' });
      }
   }

   onField (field: string, value: any, req: Request) {
      req.body[field] = value;
   }

   onFinish(files: FilesType[], req: Request, next: NextFunction) {
      req.body.files = files;

      next();
   }
}

export default new BusboyActions();