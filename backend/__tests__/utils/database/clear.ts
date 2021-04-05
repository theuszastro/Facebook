import { getRepository, getConnection } from 'typeorm';

export async function clear() {
   const connection = getConnection();

   if (connection.isConnected) {
      const entities = connection.entityMetadatas;

      for await (const entity of entities) {
         const repository = getRepository(entity.name);

         await repository.clear();
      }
   }
}
