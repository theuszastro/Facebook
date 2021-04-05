import { getRepository } from 'typeorm';

import { io } from '../../server';

import Posts from '../../database/models/Posts';
import ShareModel from '../../database/models/Share';

import FeedbackView from '../../views/FeedbackView';

const postRelations = ['shares', 'shares.user', 'shares.user.avatars'];
const shareRelations = ['postagem', 'shares', 'shares.user', 'shares.user.avatars'];

class SocketShareController {
   async create(descricao: string, type: 'post' | 'share', id: any, user: any, postId: any){
      const Repository = getRepository(ShareModel);
      const PostRepository = getRepository(Posts);

      const getPost = async () => {
         switch(type){
            case 'post':
               const post = await PostRepository.findOne(id, { relations: postRelations });
               if(!post) throw Error('');

               return post;

            case 'share':
               const share = await Repository.findOne(id, { relations: shareRelations });
               if(!share) throw Error('');

               return share;
         }
      }

      try {
         const Element = await getPost();

         const Share = Repository.create({
            description: descricao? descricao : '',
            user: user.id,
            ...type === 'post' && { post: id },
            ...type === 'share' && {
               compartilhado: id,
               post: postId
            },
         });

         await Repository.save(Share);

         Share.user = user;
         Element.shares = [Share, ...Element.shares];

         io.emit('updateShares', {
            id,
            shares: FeedbackView.RenderShares(Element.shares)
         });
      } catch(e) {
         console.log('Não sei qual erro o facebook gera ao dar erro em like/compartilhar');
      }
   }
}

export default new SocketShareController();