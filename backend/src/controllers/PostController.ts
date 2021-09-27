import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { FilesType } from 'src/config/busboy';

import FilesModel from '../database/models/File';
import PostModel from '../database/models/Post';
import FriendModel from '../database/models/Friend';

import PostUtils from '../middlewares/utils/PostUtils';

import PostView from '../views/PostView';

interface RequestBodyType {
   description: string;
   files: FilesType[];
   oldFiles: string[];
   userId: any;
}

const isTest = process.env.NODE_ENV === 'test';
const totalByPage = 10;

class PostController {
   async list(req: Request, res: Response) {
      const Repository = getRepository(PostModel);
      const friendRepository = getRepository(FriendModel);

      const { userId } = req.body;
      const { page = 1 } = req.query;

      const friends = await friendRepository.find({
         where: { user: { id: userId } },
         relations: ['friend', 'user'],
      });

      const friendIds: string[] = [];

      for (let friend of friends) {
         friendIds.push(friend.friend.id);
      }

      let total = 0;
      const allPosts: PostModel[] = [];

      for await (let friendId of friendIds) {
         const postsAmount = await Repository.count({ where: { user: friendId } });
         const posts = await Repository.find({
            where: { user: friendId },
            relations: [
               'media',
               'user',
               'user.avatars',
               'likes',
               'likes.user',
               'likes.user.avatars',
            ],
            take: 10,
         });

         total += postsAmount;

         for (let post of posts) {
            allPosts.push(post);
         }
      }

      const posts: PostModel[] = [];
      const postIds: string[] = [];

      while (true) {
         if (posts.length === allPosts.length || posts.length >= totalByPage) {
            break;
         }

         const rand = Math.floor(Math.random() * allPosts.length);

         if (allPosts[rand] && !postIds.includes(allPosts[rand].id)) {
            posts.push(allPosts[rand]);
            postIds.push(allPosts[rand].id);
         }
      }

      total = Math.ceil(Math.floor(total / totalByPage));

      return res.status(200).json({
         totalPages: total <= 1 ? 1 : total,
         posts: PostView.renderMultiplyPost(posts),
      });
   }

   async listById(req: Request, res: Response) {
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
