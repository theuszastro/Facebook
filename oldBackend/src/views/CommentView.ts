import dayjs from 'dayjs';

import CommentModel from '../database/models/Comment';
import ResponseModel from '../database/models/Response';
import File from '../database/models/Files';

import UserView from './UserView';
import CommentLikeView from './CommentLikeView';
import MediaView from './MediaView';

class CommentView {
   RenderCommentsNoOrdened(comments: CommentModel[]){
      return comments.map(comment => ({
         id: comment.id,
         content: comment.content,
         edited: Boolean(comment.edited),
         media: MediaView.renderMedia(comment.media),
         likes: CommentLikeView.RenderLikes(comment.likes),
         responses: this.RenderCommentResponse(comment.responses),
         user: UserView.RenderSimpleUser(comment.user),
         createdAt: comment.createdAt
      }));
   }

   RenderComments(comments: CommentModel[]){
      const CommentsOrdened = comments.sort(this.SortDecrescente);

      return CommentsOrdened.map(comment => ({
         id: comment.id,
         content: comment.content,
         edited: Boolean(comment.edited),
         media: MediaView.renderMedia(comment.media),
         likes: CommentLikeView.RenderLikes(comment.likes),
         responses: this.RenderCommentResponse(comment.responses),
         user: UserView.RenderSimpleUser(comment.user),
         createdAt: comment.createdAt
      }));
   }

   private RenderCommentResponse(comments: ResponseModel[]){
      const CommentsOrdened = comments.sort(this.SortDecrescente);

      return CommentsOrdened.map(comment => ({
         id: comment.id,
         content: comment.content,
         edited: Boolean(comment.edited),
         media: MediaView.renderMedia(comment.media),
         likes: CommentLikeView.RenderLikes(comment.likes),
         user: UserView.RenderSimpleUser(comment.user),
         createdAt: comment.createdAt
      }))
   }

   private SortDecrescente(a: CommentModel | ResponseModel, b: CommentModel | ResponseModel){
      const DataA = dayjs(a.createdAt) as any;
      const DataB = dayjs(b.createdAt) as any;

      return DataB - DataA;
   }
}

export default new CommentView;