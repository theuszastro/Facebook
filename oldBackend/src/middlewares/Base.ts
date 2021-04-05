import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import UserModel from '../database/models/User';
import Avatar from '../database/models/Avatar';
import Cover from '../database/models/Capa';
import Posts from '../database/models/Posts';
import CommentResponse from '../database/models/Response';
import FriendModel from '../database/models/Friend';

class Base {
   async baseMiddle (req: Request, res: Response) {
      const { authorization } = req.headers;
      if(!authorization) throw Error('Fazer Login');

      const [, token] = authorization.split(' ');
      if(!token) throw Error('Fazer Login');

      const isValid: any = jwt.verify(token, 'qualquercoisaquesejasecreto');
      const { id, cargo } = isValid;

      const UserValid = await this.getUser(id);
      if(!UserValid) {
         if(cargo === 'Administrador')
            return { id, cargo };

         throw Error('Fazer Login')
      };

      return { id, cargo };
   }

   async getUser (id: string) {
      const Repository = getRepository(UserModel);

      const User = await Repository.findOne(id);

      return User? true : false;
   }

   async getCover (id: string) {
      const Repository = getRepository(Cover);

      const Capa = await Repository.findOne(id, { relations: ['user'] });

      return Capa;
   }

   async getAvatar (id: string) {
      const Repository = getRepository(Avatar);

      const AvatarPhoto = await Repository.findOne(id, { relations: ['user'] });

      return AvatarPhoto;
   }

   async getPost (id: string) {
      const Repository = getRepository(Posts);

      const Post = await Repository.findOne(id, { relations: ['user', 'comments', 'comments.user'] });
      if(!Post) throw Error('Post não encontrado');

      return Post;
   }

   async getResponse (id: string) {
      const Repository = getRepository(CommentResponse);

      const Comment = await Repository.findOne(id, { relations: ['user'] });
      if(!Comment) throw Error('Comentário invalido');

      return Comment;
   }

   async getFriend (id: string) {
      const Repository = getRepository(FriendModel);

      const Friend = await Repository.findOne(id, { relations: ['user', 'friend'] });
      if(!Friend) throw Error('Amigo');

      return Friend;
   }
}

export default new Base();