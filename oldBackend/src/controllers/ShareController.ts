import { Request, Response} from 'express';
import { getRepository } from 'typeorm';

import ShareModel from '../database/models/Share';

class ShareController {
   async ListAll(req: Request, res: Response){
      const Repository = getRepository(ShareModel);

      const Shares = await Repository.find({
         relations: [
            'user',
            'user.avatars',
            'postagem',
            'postagem.user',
            'postagem.user.avatars',
            'likes',
            'likes.user',
            'likes.user.avatars',
         ]
      });

      return res.status(200).json(Shares);
   }

   async ListOne(req: Request, res: Response){
      const Repository = getRepository(ShareModel);

      const { userId } = req.body;
      const { id } = req.params;

      const Share = await Repository.findOne(
         id,
         {
            where: { user: userId },
            relations: [
               'user',
               'user.avatars',
               'postagem',
               'postagem.user',
               'postagem.user.avatars',
               'likes',
               'likes.user',
               'likes.user.avatars',
            ]
         }
      );

      return res.status(200).json(Share);
   }

   async Create(req: Request, res: Response){
      const Repository = getRepository(ShareModel);

      const { description, post, share, userId } = req.body;
      if(!description && !post || !description && !share) throw Error('Dados invalidos');

      const Postagem = share && await Repository.findOne(share, { relations: ['post'] });
      if(!Postagem) throw Error('compartilhamento');

      const Share = Repository.create({
         description: description? description : '',
         user: userId,
         ...post && { postagem: post },
         ...share && {
            compartilhado: share,
            postagem: Postagem.post.id as any
         }
      });

      await Repository.save(Share);

      return res.status(201).send();
   }

   async Update(req: Request, res: Response){
      const Repository = getRepository(ShareModel);

      const { id } = req.params;
      const { description } = req.body;

      const Share = await Repository.findOne(id);
      if(!Share) throw Error('compartilhamento');

      Share.description = description;

      await Repository.save(Share);

      return res.status(200).send();
   }

   async Delete(req: Request, res: Response){
      const Repository = getRepository(ShareModel);

      const { id } = req.params;

      const Share = await Repository.findOne(id);
      if(!Share) throw Error('compartilhamento');

      await Repository.delete(id);

      return res.status(200).send();
   }
}

export default new ShareController;