import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Avatar from '../database/models/Avatar';

class AvatarController {
   async getAvatarByUser(req: Request, res: Response) {
      const Repository = getRepository(Avatar);

      const Avatars = await Repository.find({
         where: { user: req.params.id },
         order: {
            createdAt: 'DESC'
         }
      });

      return res.status(200).json({ avatars: Avatars });
   }

   async AvatarUpload(req: Request, res: Response){
      const Repository = getRepository(Avatar);
      const { userId, files }: { userId: any; files: Array<{ filename: string; isVideo: boolean; }> } = req.body;

      const avatar = files.map(item => Repository.create({ path: item.filename, user: userId }));

      await Repository.save(avatar);

      return res.status(200).send();
   }

   async AvatarReupload(req: Request, res: Response){
      const Repository = getRepository(Avatar);
      const { path, userId } = req.body;

      const Avatars = await Repository.find({ where: { user: userId } });

      if(Avatars[Avatars.length - 1].path === path){
         return res.status(200).send();
      }

      const image = Repository.create({
         path: path,
         user: userId
      });

      await Repository.save(image);

      return res.status(200).send();
   }

   async AvatarDelete(req: Request, res: Response){
      const Repository = getRepository(Avatar);

      await Repository.delete(req.params.id);

      return res.status(200).send();
   }
}

export default new AvatarController;