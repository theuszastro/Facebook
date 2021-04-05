import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import highlighted from '../database/models/Highlighted';

class HighlightedController {
   async DestaqueUpload(req: Request, res: Response){
      const Repository = getRepository(highlighted);
      const { userId, files }: { userId: any; files: Array<{ filename: string; isVideo: boolean }> } = req.body;

      const oldsDestaques = await Repository.find({ where: { user: userId } });

      if(oldsDestaques.length)
         await Repository.delete(oldsDestaques.map(item => item.id));

      const destaques = files.map((item, index) => {
         return Repository.create({
            order: String(index + 1),
            path: item.filename,
            user: userId
         });
      });

      await Repository.save(destaques);

      return res.status(200).send();
   }

   async DestaqueUpdate(req: Request, res: Response){
      const Repository = getRepository(highlighted);

      const { oldDestaques, userId, files }: {
         oldDestaques: string[];
         userId: any;
         files: Array<{ filename: string; isVideo: boolean;
      }> } = req.body;

      let CurrentDestaques = await Repository.find({ where: { user: userId } });

      if(oldDestaques){
         let DestaqueIds: string[] = [];
         let IdsUpdate: string[] = [];

         CurrentDestaques.map(item => {
            if(oldDestaques.includes(item.id)){
               IdsUpdate.push(item.id);

               return;
            }

            DestaqueIds.push(item.id);
         });

         DestaqueIds.length && await Repository.delete(DestaqueIds);
      } else {
         if(CurrentDestaques.length){
            const idsDelets = CurrentDestaques.map(item => item.id);

            await Repository.delete(idsDelets);
         }
      }

      const UpdatedDestaques = await Repository.find({ where: { user: userId } });
      let NewDestaques: highlighted[] = [];

      if(files.length){
         let DestaqueIds = UpdatedDestaques.map(item => item.id);

         let NewImages = files.map(item => {
            return Repository.create({
               order: '',
               path: item.filename,
               user: userId
            });
         });

         NewDestaques = [...UpdatedDestaques, ...NewImages];
         DestaqueIds.length && await Repository.delete(DestaqueIds);

         const destaquesForSave = NewDestaques.map((item, index) => {
            return Repository.create({
               order: String(index + 1),
               path: item.path,
               user: userId
            })
         });

         await Repository.save(destaquesForSave);
      } else {
         NewDestaques = UpdatedDestaques;

         const destaquesForSave = NewDestaques.map((item, index) => {
            return Repository.create({
               path: item.path,
               order: String(index + 1),
               user: userId
            })
         })

         UpdatedDestaques.length && await Repository.delete(UpdatedDestaques.map(item => item.id));
         await Repository.save(destaquesForSave);
      }

      return res.status(200).json();
   }
}

export default new HighlightedController;