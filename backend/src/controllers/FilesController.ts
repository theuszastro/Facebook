import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Files from '../database/models/File';

import { FilesType } from '../config/busboy';

interface RequestBodyType {
   userId: any;
   files: FilesType[];
   id: string;
}

const isTest = process.env.NODE_ENV === 'test';

class FilesController {
   async uploadAvatar(req: Request, res: Response) {
      const Repository = getRepository(Files);

      const { userId, files }: RequestBodyType = req.body;

      const Avatars = files.map(item => {
         return Repository.create({
            path: item.path,
            isVideo: item.isVideo,
            userAvatar: userId,
         });
      });

      await Repository.save(Avatars);

      if (isTest) {
         return res.status(201).json({ id: Avatars[0].id });
      }

      return res.status(201).send();
   }

   async reuploadAvatar(req: Request, res: Response) {
      const Repository = getRepository(Files);
      const { userId, id }: RequestBodyType = req.body;

      if (!id) throw Error('data invalid');

      const file = await Repository.findOne(id, { where: { userAvatar: userId } });
      if (!file) throw Error('avatar not valid');

      const avatar = Repository.create({
         userAvatar: userId,
         path: file.path,
         isVideo: file.isVideo,
      });

      await Repository.save(avatar);

      return res.status(201).send();
   }
}

export default new FilesController();
