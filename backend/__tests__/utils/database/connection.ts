import { createConnection } from 'typeorm';

export async function connection() {
   const connection = await createConnection();
   await connection.dropDatabase();

   const notRunMigrations = await connection.showMigrations();

   if (notRunMigrations) {
      await connection.runMigrations();
   }
}
