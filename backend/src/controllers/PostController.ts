import { Request, Response } from 'express';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import { FilesType } from '../config/busboy';
import { Post } from '../utils/types';

import PostUtils from '../middlewares/utils/PostUtils';
import PostView from '../views/PostView';

import { prisma } from '../database/connection';

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
      const { userId } = req.body;

      const posts = await prisma.post.findMany({
         where: {
            userPostId: userId,
         },
         include: {
            _count: true,
            media: true,
            user: true,
         },
         take: 10,
      });

      return res.status(200).json(posts);
   }

   async listById(req: Request, res: Response) {
      const { id } = req.params;

      const Post = await prisma.post.findUnique({
         where: {
            id,
         },
         include: {
            media: true,
            user: true,
         },
      });

      return res.status(200).json(Post);
   }

   async create(req: Request, res: Response) {
      const { description, files, userId }: RequestBodyType = req.body;

      const Post = await prisma.post.create({
         data: {
            id: v4(),
            description: description ?? '',
            edited: false,
            media_grid: files && files.length ? PostUtils.getGridMedia(files) : '',
            ...(files &&
               files.length >= 1 && {
                  media: {
                     create: files.map(item => {
                        return {
                           id: v4(),
                           isVideo: item.isVideo,
                           path: item.path,
                        };
                     }),
                  },
               }),
            user: {
               connect: {
                  id: userId,
               },
            },
            createdAt: dayjs().format(),
         },
      });

      if (isTest) {
         const postUpdated = await prisma.post.findUnique({
            where: { id: Post.id },
            include: { media: true, user: true },
         });

         return res.status(201).json(postUpdated);
      }

      return res.status(201).send();
   }

   async update(req: Request, res: Response) {
      const { description, oldFiles, files, userId }: RequestBodyType = req.body;
      const { id } = req.params;

      if (description) {
         await prisma.post.update({
            where: { id },
            data: { description },
         });
      }

      if (oldFiles && oldFiles.length >= 1) {
         const PostFiles = await prisma.file.findMany({
            where: {
               postId: id,
            },
         });

         const trans: any[] = [];

         for (let file of PostFiles) {
            if (!oldFiles.includes(file.id)) {
               trans.push(prisma.file.delete({ where: { id: file.id } }));
            }
         }

         await prisma.$transaction(trans);
      }

      if (files && files.length) {
         const trans: any[] = [];

         for (let file of files) {
            trans.push(
               prisma.file.create({
                  data: {
                     id: v4(),
                     path: file.path,
                     isVideo: file.isVideo,
                     postId: id,
                  },
               })
            );
         }

         await prisma.$transaction(trans);
      }

      if (isTest) {
         const UpdatedPost = await prisma.post.findUnique({
            where: { id: id },
            include: { media: true },
         });

         return res.status(200).json(UpdatedPost);
      }

      return res.status(200).send();
   }

   async delete(req: Request, res: Response) {
      const { id } = req.params;

      await prisma.post.delete({ where: { id } });

      return res.status(200).send();
   }
}

export default new PostController();
