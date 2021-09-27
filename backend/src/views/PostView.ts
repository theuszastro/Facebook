import PostModel from '../database/models/Post';
import Files from '../database/models/File';

import UserView from './UserView';
import LikeView from './LikeView';

class PostView {
   renderSinglePost(post: PostModel) {
      const { shortTime, time } = LikeView.getTime(post.createdAt);

      return {
         id: post.id,
         description: post.description,
         edited: Boolean(post.edited),
         media_grid: post.media_grid,
         media: this.renderPostMedia(post.media),
         user: UserView.renderSingleSimpleUser(post.user),
         reactions: LikeView.renderLikes(post.likes),
         shortTime,
         time,
      };
   }

   renderMultiplyPost(posts: PostModel[]) {
      return posts.map(post => this.renderSinglePost(post));
   }

   renderPostMedia(medias: Files[]) {
      return medias.map(item => {
         return {
            id: item.id,
            path: item.path,
            isVideo: Boolean(item.isVideo),
         };
      });
   }
}

export default new PostView();
