import Postagem from '../database/models/Posts';

import FeedbackView from './FeedbackView';
import MidiaView from './MediaView';

class PostagemView {
   RenderSinglePost(post: Postagem){
      return {
         id: post.id,
         description: post.description,
         edited: Boolean(post.edited),
         media: MidiaView.renderMedia(post.media),
         feedback: FeedbackView.RenderFeedBack(post.likes, post.comments, post.shares),
         createdAt: post.createdAt,
      }
   }

   RenderMultiplePost(posts: Postagem[]){
      return posts.map(post => this.RenderSinglePost(post));
   }
}

export default new PostagemView;