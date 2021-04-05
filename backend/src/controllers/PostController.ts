import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { FilesType } from 'src/config/busboy';

import FilesModel from '../database/models/Files';
import PostModel from '../database/models/Posts';
import PostUtils from '../middlewares/utils/PostUtils';

interface RequestBodyType {
   description: string;
   files: FilesType[];
   oldFiles: string[];
   userId: any;
}

const isTest = process.env.NODE_ENV === 'test';

class PostController {
   async list(req: Request, res: Response) {
      const Repository = getRepository(PostModel);

      const { id } = req.params;

      const Post = await Repository.findOne(id, { relations: ['media'] });

      return res.status(200).json(Post);
   }

   async create(req: Request, res: Response) {
      const Repository = getRepository(PostModel);
      const filesRepository = getRepository(FilesModel);

      const { description, files, userId }: RequestBodyType = req.body;

      let Post = Repository.create({
         description: description ?? '',
         edited: 0,
         media_grid: files && files.length ? PostUtils.getGridMedia(files) : '',
         user: userId,
      });

      await Repository.save(Post);

      if (files && files.length) {
         const filesForSave = files.map(item => {
            return filesRepository.create({
               isVideo: item.isVideo,
               path: item.path,
               post: Post.id as any,
            });
         });

         await filesRepository.save(filesForSave);
      }

      if (isTest) {
         Post = await Repository.findOne(Post.id, { relations: ['media'] });

         return res.status(201).json(Post);
      }

      return res.status(201).send();
   }

   async update(req: Request, res: Response) {
      const Repository = getRepository(PostModel);
      const filesRepository = getRepository(FilesModel);

      const { description, oldFiles, files, userId }: RequestBodyType = req.body;

      const Post = await Repository.findOne(req.params.id, { relations: ['media'] });

      description && (Post.description = description);

      await Repository.save(Post);

      const deleteIds: string[] = [];

      if (oldFiles && oldFiles.length) {
         const PostFiles = await filesRepository.find({ where: { post: Post.id } });

         PostFiles.map(item => {
            if (oldFiles.includes(item.id)) return;

            deleteIds.push(item.id);
         });

         deleteIds.length && (await filesRepository.delete(deleteIds));
      }

      if (files && files.length) {
         const newFiles = files.map(item => {
            return filesRepository.create({
               isVideo: item.isVideo,
               path: item.path,
               post: Post.id as any,
            });
         });

         await filesRepository.save(newFiles);
      }

      if (isTest) {
         const UpdatedPost = await Repository.findOne(Post.id, { relations: ['media'] });

         return res.status(200).json(UpdatedPost);
      }

      return res.status(200).send();
   }

   async delete(req: Request, res: Response) {
      const Repository = getRepository(PostModel);

      const { id } = req.params;

      await Repository.delete(id);

      return res.status(200).send();
   }
}

export default new PostController();
