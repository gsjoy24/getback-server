import nodemailer from 'nodemailer';
import config from '../config';

const emailSender = async (subject: string, email: string, html: string) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: config.app_email,
			pass: config.app_password
		}
	});

	const info = await transporter.sendMail({
		from: '"Lost And Found" <gour.joy24@gmail.com>',
		to: email,
		subject,
		html
	});
};

export default emailSender;
