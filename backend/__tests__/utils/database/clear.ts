import { prisma } from '../../../src/database/connection';

export async function clear() {
   const models = Object.keys(prisma)
      .filter(mo => !mo.startsWith('$'))
      .filter(mo => !mo.startsWith('_'));

   const deleteModels: any[] = [];

   for (let model of models) {
      deleteModels.push(prisma[model].deleteMany());
   }

   await prisma.$transaction(deleteModels);
}
