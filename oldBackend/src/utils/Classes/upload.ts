import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import random from 'crypto-random-string';

import Destaque from '../../database/models/Highlighted';
import Avatar from '../../database/models/Avatar';
import Cover from '../../database/models/Capa';
import Files from '../../database/models/Files';

class Upload {
   uploadAvatarOrCover(req: Request, res: Response, type: string, user: any) {
      let busboy = new Busboy({ headers: req.headers, limits: { fileSize: 500 * 1024 * 1024 } });
      let mimetypeAllowed = ['image/jpeg', 'image/png', 'image/gif'];
      let files: Array<{ filename: string; isVideo: boolean }> = [];

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
         let hash = random({ length: 30 });
         let date = Date.now();
         let name = `${hash}-${date}.${mimetype.split('/')[1]}`;
         let saveTo = path.join(__dirname, '../../../uploads', name);

         files = [...files, { filename: name, isVideo: mimetype === 'video/mp4' || mimetype === 'video/mpeg' }];

         if(mimetypeAllowed.includes(mimetype)){
            file.pipe(fs.createWriteStream(saveTo));
         } else {
            return res.status(400).json({ error: 'formato de arquivo não aceitado!' });
         }
      });

      busboy.on('finish', async () => {
         const UploadFile = async () => {
            if(type === 'avatar'){
               const Repository = getRepository(Avatar);

               const fileForSave = files.map(item => {
                  return Repository.create({
                     path: item.filename,
                     user: user
                  })
               });

               await Repository.save(fileForSave);
            }

            if(type === 'cover'){
               let Repository = getRepository(Cover);

               let fileForSave = files.map(item => {
                  return Repository.create({
                     path: item.filename,
                     user: user
                  })
               });

               await Repository.save(fileForSave);
            }

         }

        UploadFile()

         console.log('finish');
      });

      req.pipe(busboy);
   }

   uploadDestaque(req: Request, res: Response, user: any, update: boolean){
      let busboy = new Busboy({ headers: req.headers, limits: { fileSize: 50 * 1024 * 1024 } });
      let mimetypeAllowed = ['image/jpeg', 'image/png', 'image/gif'];
      let files: Array<{ filename: string; isVideo: boolean }> = [];

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
         let hash = random({ length: 30 });
         let date = Date.now();
         let name = `${hash}-${date}.${mimetype.split('/')[1]}`;
         let saveTo = path.join(__dirname, '../../../uploads', name);

         files = [...files, { filename: name, isVideo: mimetype === 'video/mp4' || mimetype === 'video/mpeg' }];

         if(mimetypeAllowed.includes(mimetype)){
            file.pipe(fs.createWriteStream(saveTo));
         } else {
            return res.status(400).json({ error: 'formato de arquivo não aceitado!' });
         }
      });

      busboy.on('finish', async () => {
         const Repository = getRepository(Destaque);

         if(update){
            const UpdatedDestaques = await Repository.find({ where: { user: user } });
            let NewDestaques: Destaque[] = [];

            if(files.length){
               let DestaqueIds = UpdatedDestaques.map(item => item.id);

               let NewImages = files.map(item => {
                  return Repository.create({
                     order: '',
                     path: item.filename,
                     user: user
                  });
               });

               NewDestaques = [...UpdatedDestaques, ...NewImages];
               DestaqueIds.length && await Repository.delete(DestaqueIds);

               const destaquesForSave = NewDestaques.map((item, index) => {
                  return Repository.create({
                     order: String(index + 1),
                     path: item.path,
                     user: user
                  })
               });

               await Repository.save(destaquesForSave);
            }
         } else {
            const destaquesForSave = files.map((item, index) => {
               return Repository.create({
                  order: `${index + 1}`,
                  path: item.filename,
                  user: user
               })
            })

            await Repository.save(destaquesForSave);
         }

         console.log('finish');
      });

      req.pipe(busboy);
   }

   uploadFiles(req: Request, res: Response, type: string, postId: any, commentId: any, response: any){
      let busboy = new Busboy({ headers: req.headers, limits: { fileSize: 500 * 1024 * 1024 } });
      let mimetypeAllowed = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
      let files: Array<{ filename: string; isVideo: boolean }> = [];

      busboy.on('file', (_, file, filename, __, mimetype) => {
         let hash = random({ length: 30 });
         let date = Date.now();
         let name = `${hash}-${date}.${mimetype.split('/')[1]}`;
         let saveTo = path.join(__dirname, '../../../uploads', name);

         files = [...files, { filename: name, isVideo: mimetype === 'video/mp4' || mimetype === 'video/mpeg' }];

         if(mimetypeAllowed.includes(mimetype)){
            file.pipe(fs.createWriteStream(saveTo));
         } else {
            return res.status(400).json({ error: 'formato de arquivo não aceitado!' });
         }
      });

      busboy.on('finish', async () => {
         const Repository = getRepository(Files);

         switch(type){
            case 'post':
               const imagesFiles = files.map(item => {
                  return Repository.create({
                     isVideo: Number(item.isVideo),
                     path: item.filename,
                     post: postId
                  });
               });

               await Repository.save(imagesFiles);

               break;

            case 'comment':
               const commentImages = files.map(item => {
                  return Repository.create({
                     isVideo: Number(item.isVideo),
                     path: item.filename,
                     comment: commentId
                  });
               })

               await Repository.save(commentImages);

               break;

            case 'response':
               const responseImages = files.map(item => {
                  return Repository.create({
                     isVideo: Number(item.isVideo),
                     path: item.filename,
                     comment: commentId
                  });
               })

               await Repository.save(responseImages);

               break;
         }

         console.log('finish');
      });

      req.pipe(busboy);
   }
}

export default new Upload;