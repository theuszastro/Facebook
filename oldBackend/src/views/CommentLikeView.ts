import dayjs from 'dayjs';

import FeedbackView, { FeedbackProps } from './FeedbackView';

import UserView from './UserView';
import Feedback from './FeedbackView';

import Like from '../database/models/Like';

class CommentLikeView {
   RenderLikes(likes: Like[]){
      const CommentLikes = likes.map(like => ({
         id: like.id,
         reaction: like.reaction,
         user: UserView.RenderSimpleUser(like.user),
         createdAt: like.createdAt
      }));

      return {
         all: CommentLikes.sort(this.SortDecrescente),
         like: Feedback.RenderLike(CommentLikes),
         amei: Feedback.RenderLove(CommentLikes),
         forca: Feedback.RenderForca(CommentLikes),
         uau: Feedback.RenderUau(CommentLikes),
         triste: Feedback.RenderSad(CommentLikes),
         grr: Feedback.RenderGrr(CommentLikes),
         reactionsAmount: CommentLikes.length,
         reactionsAmountFormated: Feedback.FormatLength(CommentLikes.length),
         reactionsSize: [
            { name: 'Like', length: Feedback.RenderLike(CommentLikes).length },
            { name: 'Amei', length: Feedback.RenderLove(CommentLikes).length },
            { name: 'Força', length: Feedback.RenderForca(CommentLikes).length },
            { name: 'Haha', length: Feedback.RenderHaha(CommentLikes).length },
            { name: 'Uau', length: Feedback.RenderUau(CommentLikes).length },
            { name: 'Triste', length: Feedback.RenderSad(CommentLikes).length },
            { name: 'Grr', length: Feedback.RenderGrr(CommentLikes).length },
         ].sort(FeedbackView.ReactionsSort)
      }
   }

   private SortDecrescente(a: FeedbackProps, b: FeedbackProps){
      const DataA = dayjs(a.createdAt) as any;
      const DataB = dayjs(b.createdAt) as any;

      return DataB - DataA;
   }
}

export default new CommentLikeView;