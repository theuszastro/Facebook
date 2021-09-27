import { Request, Response } from 'express';
import type { File } from '@prisma/client';

import { v4 } from 'uuid';

import { prisma } from '../database/connection';
import { FilesType } from '../config/busboy';

interface RequestBodyType {
   userId: string;
   files: FilesType[];
   id: string;
}

const isTest = process.env.NODE_ENV === 'test';

class FilesController {
   async uploadAvatar(req: Request, res: Response) {
      const { userId, files }: RequestBodyType = req.body;

      const Avatars: File[] = [];

      for await (let avatar of files) {
         const data = await prisma.file.create({
            data: {
               id: v4(),
               isVideo: avatar.isVideo,
               path: avatar.path,
               user: {
                  connect: {
                     id: userId,
                  },
               },
            },
         });

         Avatars.push(data);
      }

      if (isTest) {
         return res.status(201).json({ id: Avatars[0].id });
      }

      return res.status(201).send();
   }

   async reuploadAvatar(req: Request, res: Response) {
      const { userId, id }: RequestBodyType = req.body;
      if (!id) throw Error('data invalid');

      const file = await prisma.file.findFirst({
         where: {
            id,
            user: {
               id: userId,
            },
         },
      });
      if (!file) throw Error('avatar not valid');

      await prisma.file.create({
         data: {
            id: v4(),
            path: file.path,
            isVideo: file.isVideo,
            user: {
               connect: {
                  id: userId,
               },
            },
         },
      });

      return res.status(201).send();
   }
}

export default new FilesController();
