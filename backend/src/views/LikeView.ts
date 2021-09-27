import dayjs from 'dayjs';

import Like from '../database/models/Like';
import File from '../database/models/File';

import UserView from './UserView';

interface ReactionSizeProps {
   name: string;
   length: number;
}

interface NewLike {
   id: string;
   reaction: string;
   user: {
      id: string;
      firstname: string;
      lastname: string;
      sex: string;
      online: boolean;
      avatars: File[];
   };
   createdAt: string;
}

class LikeView {
   renderSingle(like: Like) {
      const { shortTime, time } = this.getTime(like.createdAt);

      return {
         id: like.id,
         reaction: like.reaction,
         user: UserView.renderSingleSimpleUser(like.user),
         shortTime,
         time,
         createdAt: like.createdAt,
      };
   }

   renderMultiply(likes: Like[]) {
      return likes.map(like => this.renderSingle(like));
   }

   getTime(createdAt: string) {
      const { shortTime, time } = this.getStringTime(createdAt);

      return { shortTime, time };
   }

   renderLikes(likes: Like[]) {
      const LikesFormated = likes.map(like => this.renderSingle(like));

      return {
         all: LikesFormated.sort(this.SortDecrescente),
         like: this.renderReaction(LikesFormated, 'Like'),
         love: this.renderReaction(LikesFormated, 'Love'),
         care: this.renderReaction(LikesFormated, 'Care'),
         haha: this.renderReaction(LikesFormated, 'Haha'),
         wow: this.renderReaction(LikesFormated, 'Wow'),
         sad: this.renderReaction(LikesFormated, 'Sad'),
         angry: this.renderReaction(LikesFormated, 'Angry'),
         reactionAmount: LikesFormated.length,
         reactionAmountFormated: this.FormatLength(LikesFormated.length),
         reactionsSize: [
            { name: 'Like', length: this.renderReaction(LikesFormated, 'Like').length },
            { name: 'Love', length: this.renderReaction(LikesFormated, 'Love').length },
            { name: 'Care', length: this.renderReaction(LikesFormated, 'Care').length },
            { name: 'Haha', length: this.renderReaction(LikesFormated, 'Haha').length },
            { name: 'Wow', length: this.renderReaction(LikesFormated, 'Wow').length },
            { name: 'Sad', length: this.renderReaction(LikesFormated, 'Sad').length },
            { name: 'Angry', length: this.renderReaction(LikesFormated, 'Angry').length },
         ].sort(this.reactionsSort),
      };
   }

   FormatLength(length: number) {
      let string = length.toString();

      if (length <= 999) return string;

      string = string.replace(/^([1])([0][0-9]{2})$/, 'mil');
      string = string.replace(/^([0-9]{1,3})([0][0-9]{2})$/, '$1 mil');
      string = string.replace(/^([0-9]{1,3})([0-9]{1})[0-9]{2}$/, '$1,$2 mil');

      string = string.replace(/^([1])([0][0-9]{5})$/, '$1 mi');
      string = string.replace(/^([0-9]{1,3})([0][0-9]{5})$/, '$1 mi');
      string = string.replace(/^([0-9]{1,3})([0-9])[0-9]{5}$/, '$1,$2 mi');

      string = string.replace(/^([1])([0][0-9]{8})$/, '$1 bi');
      string = string.replace(/^([0-9]{1,3})([0][0-9]{8})$/, '$1 bi');
      string = string.replace(/^([0-9]{1,3})([0-9])[0-9]{8}$/, '$1,$2 bi');

      return string;
   }

   reactionsSort(a: ReactionSizeProps, b: ReactionSizeProps) {
      return b.length - a.length;
   }

   renderReaction(likes: NewLike[], reaction: string) {
      const Like = likes.filter(like => like.reaction === reaction).sort(this.SortDecrescente);

      return Like;
   }

   private getStringTime(iso: string) {
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
            let dateWithoutYear = dateFormated.replace(/de [0-9]{4}/, '').replace('  ', ' ');

            dateObject['shortTime'] = dateWithoutYear;

            break;
      }

      dateObject['time'] = dateFormated;

      return dateObject;
   }

   private SortDecrescente(a: NewLike, b: NewLike) {
      const ElementA = dayjs(a.createdAt) as any;
      const ElementB = dayjs(b.createdAt) as any;

      return ElementB - ElementA;
   }
}

export default new LikeView();
