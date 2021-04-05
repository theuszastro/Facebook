import { Request, Response, NextFunction } from 'express';

import Base from './Base';

class Middlewares {
   async login (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);
      
      req.body.userId = id;
      req.body.cargo = cargo;

      next();
   }

   async UserIsSameOwner (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);

      if (id != req.params.id){
         return res.status(401).json({ error: 'Sem permissão para continuar!' });
      }
      
      req.body.userId = id;
      req.body.cargo = cargo;

      next();
   }

   async checkAvatarAndCover (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);

      const Cover = await Base.getCover(id);
      const Avatar = await Base.getAvatar(id);
   
      if(Cover && Cover.user.id === id){
         req.body.userId = id;
         req.body.cargo = cargo;
   
         next();
   
         return;
      }
   
      if(Avatar && Avatar.user.id === id){
         req.body.userId = id;
         req.body.cargo = cargo;
   
         next();
   
         return;
      }

      return res.status(401).json({ error: 'Sem permissão para continuar!' });
   }

   async postOwner (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);
      const { id: postId } = req.params;

      const Post = await Base.getPost(postId);
   
      if(Post.user.id === id){
         req.body.userId = id;
         req.body.cargo = cargo;
   
         next();
   
         return;
      }

      return res.status(401).json({ error: 'Sem permissão para continuar!' });
   }

   async commentInPost (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);
      const { post, comment } = req.body;

      const Post = await Base.getPost(post);

      const Comments = Post.comments.filter(com => com.id === comment);
      if(!Comments.length) throw Error('Comentário invalido');

      if(Comments[0].user.id === id){
         req.body.userId = id;
         req.body.cargo = cargo;

         next();

         return;
      }
      
      return res.status(401).json({ error: 'Sem permissão para continuar!' });
   }

   async commentOwner (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);
      const { post, comment } = req.body;

      const Post = await Base.getPost(post);

      const Comments = Post.comments.filter(com => com.id === comment);
      if(!Comments.length) throw Error('Comentário invalido');

      if(Comments[0].user.id === id){
         req.body.userId = id;
         req.body.cargo = cargo;
   
         next();
   
         return;
      } else {
         if(id === Post.user.id){
            req.body.userId = id;
            req.body.cargo = cargo;
   
            next();
   
            return;
         }
      }
      
      return res.status(401).json({ error: 'Sem permissão para continuar!' });
   }

   async responseInComment (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);

      const { comment } = req.body;

      const Comments = await Base.getResponse(comment);

      if(Comments.user.id === id){
         req.body.userId = id;
         req.body.cargo = cargo;
   
         next();
   
         return;
      }

      return res.status(401).json({ error: 'Sem permissão para continuar!' });
   }

   async isFriend (req: Request, res: Response, next: NextFunction) {
      const { id, cargo } = await Base.baseMiddle(req, res);

      const Friend = await Base.getFriend(req.params.id);

      if(Friend.user.id === id || Friend.friend.id === id){
         req.body.userId = id;
         req.body.cargo = cargo;

         next();

         return;
      }

      return res.status(401).json({ error: 'Sem permissão para continuar!' });
   }
}

export default new Middlewares();