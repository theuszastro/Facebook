import dayjs from 'dayjs';

import SolicitationModel from '../database/models/Solicitation';

import FeedView from './FeedView';
import UserView from './UserView';

class SolicitationView {
   renderMultipleSolicitation(soli: SolicitationModel[], friendsCommon: Array<{ id: string, friends: string[] }>) {
      return soli.map(item => {
         const common = friendsCommon.filter(fri => fri.id === item.id);

         return this.renderSingleSolicitation(item, common[0]);
      });
   }

   private renderSingleSolicitation(soli: SolicitationModel, friendsCommon: { id: string, friends: string[] } | undefined) {
      const shortTime = this.getStringTime(soli.createdAt);

      return {
         id: soli.id,
         status: soli.status,
         user: UserView.RenderSimpleUser(soli.from),
         shortTime,
         commonsFriends: friendsCommon ? friendsCommon.friends : [],
         createdAt: soli.createdAt,
      }
   }

   private getStringTime(iso: string)  {
      const data = dayjs(iso);
      const dataSplited = data.fromNow(true).split(' ');

      const totalDay = dayjs().daysInMonth();
      const actualDay = dayjs().date();
      const actualMonth = dayjs().month();
      const actualYear = dayjs().year();

      const second = data.second().toString().padStart(2, '0');
      const dateYear = data.year();

      let shortTime = '';

      const years = actualYear - dateYear;

      const totalSem = (+dataSplited[0] / 7) | 0;
      const sem = totalSem + (4 * (actualMonth + 1) - ((totalDay - actualDay) / 7 | 0));

      switch (dataSplited[1]) {
         case 'segundos':
            shortTime = `${second} s`;

            break;

         case 'minuto':
            shortTime = '1 m';

            break;

         case 'minutos':
            shortTime = `${dataSplited[0]} m`;

            break;

         case 'hora':
            shortTime = '1 h';

            break;

         case 'horas':
            shortTime = `${dataSplited[0]} h`;

            break;

         case 'dia':
            shortTime = `1 d`;

            break;

         case 'dias':
            if(totalSem != 0) {
               shortTime = `${totalSem} sem`;

               break;
            }

            shortTime = `${dataSplited[0]} d`;

            break;

         case 'mês':
            shortTime = `${sem} sem`;

            break;

         case 'meses':
            shortTime = `${sem} sem`;

            break;

         case 'ano':
            shortTime = `${sem + ((4 * 12) * years)} sem`;

            break;

         case 'anos':
            shortTime = `${sem + ((4 * 12) * years)} sem`;

            break;
      }

      return shortTime;
   }
}

export default new SolicitationView;