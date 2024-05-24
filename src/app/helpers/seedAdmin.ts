import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../config';
import prisma from '../utils/prisma';
import userRoles from '../utils/userRoles';

const seedAdmin = async () => {
	const adminData = {
		name: 'Gour Saha Joy',
		email: config.adminEmail,
		password: config.adminPass as string,
		role: userRoles.ADMIN
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
			await prisma.user.create({
				data: modifiedUserData as User
			});
		}
	} catch (error: any) {
		console.log(error);
	}
};

export default seedAdmin;
