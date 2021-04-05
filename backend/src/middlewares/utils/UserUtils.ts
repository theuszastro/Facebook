import { Request } from 'express';

import { validate } from 'uuid';

class UserUtils {
   compareUserId(id: string, office: string, req: Request) {
      const idValid = validate(req.params.id);

      if (office === 'Administrador') {
         return;
      }

      if (!idValid) {
         throw Error('id invalid');
      }

      if (id !== req.params.id) {
         throw Error('without permission');
      }
   }
}

export default new UserUtils();
