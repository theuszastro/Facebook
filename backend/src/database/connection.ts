import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
   datasources: {
      db: {
         url:
            process.env.NODE_ENV === 'test' ? 'file:./test.sqlite' : 'file:./database.sqlite',
      },
   },
});
