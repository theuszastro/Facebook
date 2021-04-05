import { SuperTest, Test } from 'supertest';

import { join } from 'path';

interface CreatePostProps {
   token?: string;
   withFile?: boolean;
   randomField?: boolean;
}

const image = join(__dirname, '../../images/teste.jpeg');

export async function createPost(api: SuperTest<Test>, data = {} as CreatePostProps) {
   const { token = '', withFile = false, randomField = false } = data;

   if (withFile) {
      return await api
         .post('/post')
         .set('authorization', token.length ? `Bearer ${token}` : '')
         .attach('media3', image)
         .attach('media3', image);
   }

   if (randomField) {
      return await api
         .post('/post')
         .send({ random: 'adwada' })
         .set('authorization', token.length ? `Bearer ${token}` : '');
   }

   if (token.length) {
      return await api
         .post('/post')
         .set('authorization', `Bearer ${token}`)
         .send({ description: 'Alo' });
   }

   return await api.post('/post').send({ description: 'Alo' });
}
