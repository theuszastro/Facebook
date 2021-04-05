import { Request, Response, NextFunction } from 'express';
import random from 'crypto-random-string';

import { createWriteStream } from 'fs';
import { join } from 'path';

export interface FilesType {
   path: string;
   isVideo: number;
}

class BusboyConfig {
   onFile(
      file: NodeJS.ReadableStream,
      mimetype: string,
      files: FilesType[],
      req: Request,
      res: Response
   ) {
      const hash = random({ length: 30 });
      const date = Date.now();
      const name = `${hash}-${date}.${mimetype.split('/')[1]}`;
      const saveIn = join(__dirname, '../../uploads', name);
      const isVideo = ['video/mp4', 'video/mpeg'];

      const allowedMimetype = BusboyConfig.getRule(req, res);
      if (!allowedMimetype) {
         return res.status(400).json({ error: 'this route not support uploading files' });
      }

      if (!allowedMimetype.includes(mimetype)) {
         return res.status(400).json({ error: 'this format of file not is supported' });
      }

      files.push({
         path: name,
         isVideo: Number(isVideo.includes(mimetype)),
      });

      file.pipe(createWriteStream(saveIn));
   }

   onField(field: string, value: string, req: Request) {
      req.body[field] = value;
   }

   onFinish(files: FilesType[], req: Request, next: NextFunction) {
      req.body['files'] = files;

      next();
   }

   static getRule(req: Request, res: Response) {
      const image = ['/avatar'];
      const imageAndVideo: string[] = ['/post'];
      const allowed = {
         image: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
         imageAndVideo: [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'video/mp4',
            'video/mpeg',
         ],
      };

      const path = req.path.replace(/^(\/[a-zA-Z0-9]+)\/[a-zA-Z0-9]+-.+/, '$1');

      if (image.includes(path)) {
         return allowed.image;
      }

      if (imageAndVideo.includes(path)) {
         return allowed.imageAndVideo;
      }
   }
}

export default new BusboyConfig();
