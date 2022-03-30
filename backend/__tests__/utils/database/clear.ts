import { prisma } from '../../../src/database/connection';

let isFirst = true;

export async function clear() {
	if (isFirst) {
		isFirst = false;

		return;
	}

	const models = Object.keys(prisma)
		.filter(mo => !mo.startsWith('$'))
		.filter(mo => !mo.startsWith('_'));

	const deleteModels: any[] = [];

	for (let model of models) {
		deleteModels.push(prisma[model].deleteMany());
	}

	await prisma.$transaction(deleteModels);
}
