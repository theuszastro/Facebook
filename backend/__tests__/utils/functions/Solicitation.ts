import { SuperTest, Test } from 'supertest';
import { v4 } from 'uuid';

interface CreateSolicitationProps {
   withToken?: boolean;
   randomFields?: boolean;
   toUser?: string;
   token?: string;
}

export async function createSolicitation(
   api: SuperTest<Test>,
   data = {} as CreateSolicitationProps
) {
   const { withToken = false, randomFields = false, toUser, token } = data;

   return await api
      .post('/solicitation')
      .send({ ...(randomFields ? { from: v4() } : { to: toUser ?? v4() }) })
      .set('authorization', withToken ? `Bearer ${token}` : '');
}
