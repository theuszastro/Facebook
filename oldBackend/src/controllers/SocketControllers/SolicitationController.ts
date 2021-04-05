import { getRepository } from 'typeorm';

import { io } from '../../server';

import SolicitationModel from '../../database/models/Solicitation';
import SolicitationView from '../../views/SolicitationView';

// import SolicitationView from '../../views/SolicitationView';

class SocketSolicitationController {
   async getSolicitations(user: any, socket: string) {
      const Repository = getRepository(SolicitationModel);
      const friendsCommon: Array<{ id: string; friends: string[] }> = [];

      const Solicitations = await Repository.find({
         where: { to: user },
         relations: ['from', 'from.avatars', 'from.friends', 'to', 'to.friends']
      });

      Solicitations.map(item => {
         item.from.friends.map(friend => {
            const globalCommons = friendsCommon.find(fri => fri.id === item.id);

            if(!globalCommons) {
               friendsCommon.push({
                  id: item.id,
                  friends: []
               });
            }

            if(item.to.friends.includes(friend)) {
               const commons = friendsCommon.find(fri => fri.id === item.id);
               const friendName = `${friend.friend.firstname} ${friend.friend.firstname}`;

               if(commons) {
                  commons.friends.push(friendName);
               }
            }
         });
      });

      io.to(socket).emit('solicitations', SolicitationView.renderMultipleSolicitation(Solicitations, friendsCommon));
   }

   async createSolicitation() {
      // antes de criar verificar se o recebedor já tem alguma solicitaçao enviada ao enviador;
   }

   async acceptSolicitation() {}

   async declineSolicitation() {}
}

export default new SocketSolicitationController();