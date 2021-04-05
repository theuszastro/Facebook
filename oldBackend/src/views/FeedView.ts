import dayjs from 'dayjs';

import Friend from '../database/models/Friend';
import Posts from '../database/models/Posts';
import Share from '../database/models/Share';

import Feedback from './FeedbackView';
import UserView from './UserView';
import MidiaView from './MediaView';

import { PostsByPagesType } from '../utils/interfaces';

class FeedView {
   constructor() {
      this.getStringTime = this.getStringTime.bind(this);
      this.getShortTime = this.getShortTime.bind(this);
   }

   getStringTime(iso: string) {
      const data = dayjs(iso);
      const dataSplited = data.fromNow(true).split(' ');
      const dateFormated = data.format('LLL');

      const hour = data.hour().toString().padStart(2, '0');
      const minute = data.minute().toString().padStart(2, '0');
      const second = data.second().toString().padStart(2, '0');

      const dateObject = { shortTime: '', time: '' };

      switch (dataSplited[1]) {
         case 'segundos':
            dateObject['shortTime'] = `${second} s`;

            break;

         case 'minuto':
            dateObject['shortTime'] = '1 m';

            break;

         case 'minutos':
            dateObject['shortTime'] = `${dataSplited[0]} m`;

            break;

         case 'hora':
            dateObject['shortTime'] = '1 h';

            break;

         case 'horas':
            dateObject['shortTime'] = `${dataSplited[0]} h`;

            break;

         case 'dia':
            dateObject['shortTime'] = `Ontem as ${hour}:${minute}`;

            break;

         default:
            let dateWithoutYear = dateFormated
               .replace(/de [0-9]{4}/, '')
               .replace('  ', ' ');

            dateObject['shortTime'] = dateWithoutYear;

            break;
      }

      dateObject['time'] = dateFormated;

      return dateObject;
   }

   CreateObjectPosts(postagens: Posts[], shares: Share[]) {
      let posts: any[] = [];
      let shareds: any[] = [];

      postagens.map(item => {
         posts.push({
            id: item.id,
            description: item.description,
            edited: Boolean(item.edited),
            isShared: false,
            grid: item.media_grid,
            media: MidiaView.renderMedia(item.media),
            user: UserView.RenderSimpleUser(item.user),
            feedback: Feedback.RenderFeedBack(item.likes, item.comments, item.shares),
            createdAt: item.createdAt,
         });
      });

      shares.map(item => {
         shareds.push({
            id: item.id,
            description: item.description,
            edited: Boolean(item.edited),
            isShared: true,
            postagem: {
               id: item.post.id,
               description: item.post.description,
               edited: Boolean(Number(item.post.edited)),
               grid: item.post.media_grid,
               media: MidiaView.renderMedia(item.post.media),
               user: UserView.RenderSimpleUser(item.post.user),
               createdAt: item.post.createdAt,
            },
            user: UserView.RenderSimpleUser(item.user),
            feedback: Feedback.RenderFeedBack(item.likes, item.comments, item.shares),
            createdAt: item.sharedAt,
         });
      });

      const AllPosts = [...shareds, ...posts].map(item => {
         return this.getShortTime(item);
      });

      return AllPosts;
   }

   private getShortTime(post: PostsByPagesType) {
      const { shortTime: postShortTime, time: postTime } = this.getStringTime(
         post.createdAt
      );

      post['shortTime'] = postShortTime;
      post['time'] = postTime;

      if (post.isShared && post.postagem) {
         const { shortTime, time } = this.getStringTime(post.postagem.createdAt);

         post.postagem['shortTime'] = shortTime;
         post.postagem['time'] = time;
      }

      return post;
   }
}

export default new FeedView();
