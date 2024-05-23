import { Admin } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../config';
import prisma from '../utils/prisma';

const seedAdmin = async () => {
	const adminData = {
		name: 'Gour Saha Joy',
		email: config.adminEmail,
		password: config.adminPass as string
	};
	const hashedPassword = await bcrypt.hash(adminData?.password, config.pass_salt);

	const modifiedUserData = { ...adminData, password: hashedPassword };

	const findAdmin = await prisma.admin.findUnique({
		where: {
			email: adminData.email
		}
	});

	if (!findAdmin) {
		await prisma.admin.create({
			data: modifiedUserData as Admin
		});
	}
};

export default seedAdmin;
