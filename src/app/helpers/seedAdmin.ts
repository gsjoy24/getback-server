import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../config';
import prisma from '../utils/prisma';
import userRoles from '../utils/userRoles';

const seedAdmin = async () => {
	const adminData = {
		name: 'Gour Saha Joy',
		username: 'gourjoy',
		email: config.adminEmail,
		phone: '01700000000',
		password: config.adminPass as string,
		role: userRoles.ADMIN
	};

	const profileData = {
		image: 'https://i.ibb.co/4KDPMYq/user.jpg',
		bio: 'Software Engineer',
		age: 23
	};

	try {
		const findAdmin = await prisma.user.findUnique({
			where: {
				email: adminData.email,
				role: userRoles.ADMIN
			}
		});
		const hashedPassword = await bcrypt.hash(adminData?.password, config.pass_salt);
		const modifiedUserData = { ...adminData, password: hashedPassword };

		if (!findAdmin) {
			await prisma.$transaction(async (trx) => {
				const user = await trx.user.create({
					data: modifiedUserData as User,
					select: {
						id: true
					}
				});
				await trx.userProfile.create({
					data: {
						...profileData,
						userId: user.id
					}
				});
			});
		}
	} catch (error: any) {
		console.log(error);
	}
};

export default seedAdmin;
