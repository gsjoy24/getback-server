import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../config';
import prisma from '../utils/prisma';

const seedAdmin = async () => {
	const adminData = {
		name: 'Gour Saha Joy',
		email: config.adminEmail,
		password: config.adminPass as string
	};

	try {
		const hashedPassword = await bcrypt.hash(adminData?.password, config.pass_salt);
		const modifiedUserData = { ...adminData, password: hashedPassword };

		const findAdmin = await prisma.user.findUnique({
			where: {
				email: adminData.email
			}
		});

		if (!findAdmin) {
			await prisma.user.create({
				data: modifiedUserData as User
			});
		}
	} catch (error: any) {
		console.log(error);
	}
};

export default seedAdmin;
