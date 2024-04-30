import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import prisma from '../../utils/prisma';

const createUser = async (userData: any) => {
	const { password, profile, ...restUserData } = userData;
	const hashedPassword = await bcrypt.hash(password, config.pass_salt);

	const modifiedUserData = { ...restUserData, password: hashedPassword };

	console.log({ modifiedUserData, profile });
	const newUser = await prisma.$transaction(async (trx) => {
		const user = await trx.user.create({
			data: modifiedUserData,
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true
			}
		});
		const userProfile = await trx.userProfile.create({
			data: {
				...profile,
				userId: user.id
			}
		});
		return { ...user, profile: userProfile };
	});
	return newUser;
};

const UserServices = {
	createUser
};

export default UserServices;
