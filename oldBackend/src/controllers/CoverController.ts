import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import CapaModel from '../database/models/Capa';

class CoverController {
   async CoverCreate(req: Request, res: Response){
      const Repository = getRepository(CapaModel);
      const { userId, files }: { userId: any; files: Array<{ filename: string; isVideo: boolean; }> } = req.body;

      if(!files.length){
         return res.status(400).json({ error: 'nenhum arquivo enviado' });
      }

      const covers = files.map(item => Repository.create({ path: item.filename, user: userId }));

      await Repository.save(covers);

      return res.status(201).send();
   }

   async CoverReupload(req: Request, res: Response){
      const Repository = getRepository(CapaModel);
      const { userId, path } = req.body;

      const cover = await Repository.findOne({ where: { path: path, user: userId } });

      if(cover){
         const newCover = Repository.create({ path: path, user: userId });

         await Repository.save(newCover);

         return res.status(200).send();
      }

      return res.status(400).send();
   }

   async CoverRemove(req: Request, res: Response){
      const Repository = getRepository(CapaModel);

      const { id } = req.params;

      const Cover = await Repository.findOne(id);
      if(!Cover) throw Error('Capa');

      await Repository.delete(id);

      return res.status(200).send();
   }
}

export default new CoverController;