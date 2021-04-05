import { getRepository } from 'typeorm';

import SolicitationModel from '../../database/models/Solicitation';

class SolicitationUtils {
   async checkSolicitation(user: string, to: string) {
      const Repository = getRepository(SolicitationModel);

      const Solic = await Repository.findOne({
         where: {
            to: to,
            from: user,
            status: 'Pending',
         },
      });
      if (Solic) throw Error('already sent solicitation');
   }

   async checkAlreadyUpdated(id: string, userId: any) {
      const Repository = getRepository(SolicitationModel);

      const status = ['Accepted', 'Declined'];

      const Solic = await Repository.findOne(id, { relations: ['from'] });

      if (status.includes(Solic.status)) throw Error('already updated solicitation');
      if (Solic.from.id === userId) throw Error('without permission');
   }
}

export default new SolicitationUtils();
