import { ConnectionOptions } from 'typeorm';

const database =
   process.env.NODE_ENV === 'test'
      ? '__tests__/database/test.sqlite'
      : 'src/database/database.sqlite';

const config: ConnectionOptions = {
   type: 'sqlite',
   database,
   migrations: ['./src/database/migrations/*.ts'],
   entities: ['./src/database/models/*.ts'],
   cli: {
      migrationsDir: './src/database/migrations',
   },
};

export default config;
