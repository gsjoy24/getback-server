import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '/.env') });

export default {
	port: process.env.PORT,
	env: process.env.NODE_ENV,
	pass_salt: Number(process.env.PASS_SAIL),

	accessSecret: process.env.JWT_ACCESS_SECRET as string,
	refreshSecret: process.env.JWT_REFRESH_SECRET as string,
	accessSecretExp: process.env.JWT_ACCESS_SECRET_EXPIRATION as string,
	refreshSecretExp: process.env.JWT_REFRESH_EXPIRATION as string,

	adminEmail: process.env.ADMIN_EMAIL,
	adminPass: process.env.ADMIN_PASSWORD,

	app_email: process.env.APP_EMAIL,
	app_password: process.env.APP_PASSWORD
};
