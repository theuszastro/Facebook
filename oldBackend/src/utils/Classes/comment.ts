import { Repository } from 'typeorm';

import File from '../../database/models/Files';

class CommentsActions {
   async ReuploadFile(file: string[], comment_id: any, Repository: Repository<File>, response: boolean){
      const Uploads = await Repository.find({
         ...response? { response: comment_id } : { comment: comment_id }
      });

      let oldUploads: File[] = [];

      Uploads.map(item => {
         if(file.includes(item.id)){
            oldUploads.push(item);
         }
      });

      const Delete = Uploads.map(item => item.id);
      await Repository.delete(Delete);

      const Files = oldUploads.map(file => {
         return Repository.create({
            isVideo: file.isVideo,
            path: file.path,
            ...response? { response: comment_id } : { comment: comment_id }
         });
      })

      await Repository.save(Files);
   }

   async RemoveAllFile(comment_id: any, Repository: Repository<File>, response: boolean){
      const Comments = await Repository.find({
         ...response? { response: comment_id } : { comment: comment_id }
      });

      const ids = Comments.map(item => item.id);

      ids.length && await Repository.delete(ids);
   }
}

export default new CommentsActions;