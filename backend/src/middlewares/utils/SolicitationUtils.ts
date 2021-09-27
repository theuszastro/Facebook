import { prisma } from '../../database/connection';

class SolicitationUtils {
   async checkSolicitation(user: string, to: string) {
      const Solic = await prisma.solicitation.findFirst({
         where: {
            toId: to,
            fromId: user,
            status: 'Pending',
         },
      });
      if (Solic) throw Error('already sent solicitation');
   }

   async checkAlreadyUpdated(id: string, userId: any) {
      const status = ['Accepted', 'Declined'];

      const Solic = await prisma.solicitation.findUnique({
         where: { id },
         include: { from: true },
      });

      if (status.includes(Solic.status)) throw Error('already updated solicitation');
      if (Solic.from.id === userId) throw Error('without permission');
   }
}

export default new SolicitationUtils();
