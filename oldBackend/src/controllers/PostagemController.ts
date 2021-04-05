import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Posts from '../database/models/Posts';
import File from '../database/models/Files';

import PostView from '../views/PostagemView';

interface FilesType {
   filename: string;
   isVideo: boolean;
}

class PostsUserController {
   async ListAll(req: Request, res: Response){
      const Repository = getRepository(Posts);

      const AllPosts = await Repository.find(
         {
            relations: [
               'midia',
               'likes',
               'likes.user',
               'likes.user.avatars',
               'comments',
               'comments.midia',
               'comments.user',
               'comments.user.avatars',
               'comments.likes',
               'comments.likes.user',
               'comments.likes.user.avatars',
               'comments.responses',
               'comments.responses.midia',
               'comments.responses.user',
               'comments.responses.user.avatars',
               'comments.responses.likes',
               'comments.responses.likes.user',
               'comments.responses.likes.user.avatars',
               'shares',
               'shares.user',
               'shares.user.avatars',
            ]
         }
      );

      return res.status(200).json(PostView.RenderMultiplePost(AllPosts));
   }

   async ListOne(req: Request, res: Response){
      const Repository = getRepository(Posts);

      const { id } = req.params;
      if(!id) throw Error('Dados invalidos');

      const Post = await Repository.findOne(
         id,
         {
            relations: [
               'midia',
               'likes',
               'likes.user',
               'likes.user.avatars',
               'comments',
               'comments.midia',
               'comments.user',
               'comments.user.avatars',
               'comments.likes',
               'comments.likes.user',
               'comments.likes.user.avatars',
               'comments.responses',
               'comments.responses.midia',
               'comments.responses.user',
               'comments.responses.user.avatars',
               'comments.responses.likes',
               'comments.responses.likes.user',
               'comments.responses.likes.user.avatars',
               'shares',
               'shares.user',
               'shares.user.avatars',
            ]
         }
      );
      if(!Post) throw Error('Post não encontrado');

      return res.status(200).json(PostView.RenderSinglePost(Post));
   }

   async Create(req: Request, res: Response){
      const Repository = getRepository(Posts);
      const FileRepository = getRepository(File);

      const { description, userId, files }: {
         description: string;
         userId: any;
         files: FilesType[];
      } = req.body;

      if(!userId) throw Error('Fazer Login');
      if(!description) throw Error('Dados invalidos');

      let grid = '';

      if(files.length) {
         const random = Math.ceil(Math.random() * 3);

         switch(files.length) {
            case 2:
               if(random === 2 || random === 3) {
                  grid = 'two-2';
               }

               if(random === 1) {
                  grid = 'two';
               }

               break;

            case 3:
               if(random === 2 || random === 3) {
                  grid = 'three-2';
               }

               if(random === 1) {
                  grid = 'three';
               }

               break;

            case 4:
               if(random === 3){
                  grid = 'four-3'
               }

               if(random === 2) {
                  grid = 'four-2';
               }

               if(random === 1) {
                  grid = 'four';
               }

               break;

            case 5:
               if(random === 2 || random === 3){
                  grid = 'five-2'
               }

               if(random === 1){
                  grid = 'five';
               }

               break;

            default:
               grid = 'one';
         }
      }

      const Post = Repository.create({
         description,
         media_grid: grid,
         user: userId
      });

      await Repository.save(Post);

      if(files){
         const FilesForSave = files.map(item => {
            return FileRepository.create({
               path: item.filename,
               isVideo: Number(item.isVideo),
               post: Post.id as any,
            });
         });

         await FileRepository.save(FilesForSave);
      }

      return res.status(201).send();
   }

   async Update(req: Request, res: Response){
      const Repository = getRepository(Posts);
      const FileRepository = getRepository(File);

      const { description, oldFiles, files }: {
         description: string;
         oldFiles: string[];
         files: Array<{ filename: string; isVideo: boolean }>;
      } = req.body;

      const { id } = req.params;
      if(!id) throw Error('Dados invalidos');

      const Post = await Repository.findOne(id, { relations: ['midia'] });
      if(!Post) throw Error('Post não encontrado');

      Post.description = description;

      if(files.length){
         let filesForUpdate: Array<{ path: string; isVideo: boolean; postagem: any }> = [];
         let filesForDelete: string[] = [];

         files.map(item => {
            filesForUpdate.push({
               path: item.filename,
               isVideo: item.isVideo,
               postagem: id as any,
            });
         });

         Post.media.map(item => {
            if(oldFiles.includes(item.id)){
               filesForUpdate.push({
                  path: item.path,
                  isVideo: Boolean(item.isVideo),
                  postagem: item.post
               });

               return;
            }

            filesForDelete.push(item.id);
         });

         const FilesForSave = filesForUpdate.map(item => {
            return FileRepository.create({
               path: item.path,
               isVideo: Number(item.isVideo),
               post: item.postagem
            });
         });

         await FileRepository.delete(filesForDelete);

         Post.media = FilesForSave;
      }

      await Repository.save(Post);

      return res.status(200).send();
   }

   async Delete(req: Request, res: Response){
      const Repository = getRepository(Posts);

      const { id } = req.params;
      if(!id) throw Error('Dados invalidos');

      await Repository.delete(id);

      return res.status(200).send();
   }
}

export default new PostsUserController;