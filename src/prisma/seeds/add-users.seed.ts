import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient()
async function main() {
	const salt = await bcrypt.genSalt();

	const alice = await prisma.user.upsert({
		where: { email: 'alice@prisma.io' },
		update: {},
		create: {
			username: 'alice',
			email: 'alice@prisma.io',
			password: await bcrypt.hash('alice', salt),
			firstName: 'Alice',
			lastName: 'Charles',
			roles: {
				createMany: {
					data: { name: 'USER' }
				}
			}
		},
	});

	const bob = await prisma.user.upsert({
		where: { email: 'bob@prisma.io' },
		update: {},
		create: {
			username: 'bob',
			email: 'bob@prisma.io',
			password: await bcrypt.hash('bob', salt),
			firstName: 'Bob',
			lastName: 'Calvin',
			roles: {
				createMany: {
					data: { name: 'USER' }
				}
			}
		},
	});

	const admin = await prisma.user.upsert({
		where: { email: 'admin@prisma.io' },
		update: {},
		create: {
			username: 'admin',
			email: 'admin@prisma.io',
			password: await bcrypt.hash('admin', salt),
			firstName: 'Admin',
			lastName: 'Admin',
			roles: {
				createMany: {
					data: [{ name: 'USER' }, { name: 'ADMIN' }]
				}
			}
		}
	})

	console.log(`Created users ${alice.id}=${alice.username}, ${bob.id}=${bob.username}, ${admin.id}=${admin.username}`);
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})