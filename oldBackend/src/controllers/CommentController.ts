import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

import Comment from '../database/models/Comment';
import ResponseModel from '../database/models/Response';
import File from '../database/models/Files';

class CommentController {
   constructor () {
      this.AddCommentBusiness = this.AddCommentBusiness.bind(this);
      this.UpdateCommentBusiness = this.UpdateCommentBusiness.bind(this);
   }

   async AddComment(req: Request, res: Response){
      const FileRepository = getRepository(File);

      await this.AddCommentBusiness(req, res, FileRepository, false);

      return res.status(201).send();
   }

   async UpdateComment(req: Request, res: Response){
      const FileRepository = getRepository(File);

      await this.UpdateCommentBusiness(req, res, FileRepository, false);

      return res.status(200).send();
   }

   async RemoveComment(req: Request, res: Response){
      const Repository = getRepository(Comment);
      const { comment } = req.query;

      const commentId = comment as string;

      await Repository.delete(commentId);

      return res.status(200).send();
   }

   async AddResponse(req: Request, res: Response){
      const FileRepository = getRepository(File);

      await this.AddCommentBusiness(req, res, FileRepository, true);

      return res.status(201).send();
   }

   async UpdateResponse(req: Request, res: Response){
      const FileRepository = getRepository(File);

      await this.UpdateCommentBusiness(req, res, FileRepository, true);

      return res.status(200).send();
   }

   async RemoveResponse(req: Request, res: Response){
      const Repository = getRepository(ResponseModel);
      const { comment } = req.query;

      const commentId = comment as string;

      await Repository.delete(commentId);

      return res.status(200).send();
   }

   private async AddCommentBusiness (req: Request, res: Response, FileRepository: Repository<File>, response: boolean) {
      const { post, comment: id, content, userId, files }: {
         post: any;
         comment: any;
         content: string;
         userId: any;
         files: Array<{ filename: string; isVideo: boolean }>;
      } = req.body;

      if(!content && !files.length) throw Error('Dados invalidos');

      if(response) {
         const repository = getRepository(ResponseModel);

         const Comentario = repository.create({
            content: content? content : '',
            user: userId,
            comment: id
         });

         await repository.save(Comentario);

         if(files.length){
            const filesForSave = files.map(item => {
               return FileRepository.create({
                  isVideo: Number(item.isVideo),
                  path: item.filename,
                  response: Comentario.id as any
               })
            });

            await FileRepository.save(filesForSave);
         }
      } else {
         const repository = getRepository(Comment);

         const Comentario = repository.create({
            content: content? content : '',
            user: userId,
            post: post
         });

         await repository.save(Comentario);

         if(files.length){
            const filesForSave = files.map(item => {
               return FileRepository.create({
                  isVideo: Number(item.isVideo),
                  path: item.filename,
                  comment: Comentario.id as any
               })
            });

            await FileRepository.save(filesForSave);
         }
      }
   }

   private async UpdateCommentBusiness (req: Request, res: Response, FileRepository: Repository<File>, response: boolean) {
      const { comment, content, images, files }: {
         comment: string;
         content: string;
         images: string[];
         files: Array<{ filename: string; isVideo: boolean }>;
      } = req.body;

      let filesForDelete: string[] = [];

      if(response) {
         const Repository = getRepository(ResponseModel);

         const Comentario = await Repository.findOne(comment, { relations: ['media'] });
         if(!Comentario) throw Error('Comentário invalido');

         Comentario.content = content;

         if(Comentario.media.length){
            Comentario.media.map(item => {
               if(images.includes(item.id)){
                  return;
               }

               filesForDelete.push(item.id);
            });
         }

         content && await Repository.save(Comentario);
      } else {
         const Repository = getRepository(Comment)

         const Comentario = await Repository.findOne(comment, { relations: ['media'] });
         if(!Comentario) throw Error('Comentário invalido');

         Comentario.content = content;

         if(Comentario.media.length){
            Comentario.media.map(item => {
               if(images.includes(item.id)){
                  return;
               }

               filesForDelete.push(item.id);
            });
         }

         content && await Repository.save(Comentario);
      }

      if(files.length){
         const filesForSave = files.map(item => {
            return FileRepository.create({
               path: item.filename,
               isVideo: Number(item.isVideo),
               ...response? { response: comment as any } : { comment: comment as any }
            });
         });

         await FileRepository.save(filesForSave);
      }

      filesForDelete.length && await FileRepository.delete(filesForDelete);
   }
}

export default new CommentController;