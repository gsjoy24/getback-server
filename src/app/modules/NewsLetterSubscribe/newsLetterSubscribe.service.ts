import prisma from '../../utils/prisma';

const createNewSubscriber = async (email: string) => {
	const isExist = await prisma.newsLetterEmails.findUnique({
		where: {
			email
		}
	});
	if (isExist) {
		throw new Error('You are already subscribed!');
	}
	const newSubscriber = await prisma.newsLetterEmails.create({
		data: {
			email
		}
	});
	return newSubscriber;
};

const getSubscribers = async () => {
	const subscribers = await prisma.newsLetterEmails.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});
	return subscribers;
};

const unsubscribeSubscriber = async (email: string) => {
	const isExist = await prisma.newsLetterEmails.findUnique({
		where: {
			email
		}
	});
	if (!isExist) {
		throw new Error('You are not subscribed!');
	}
	const deletedSubscriber = await prisma.newsLetterEmails.delete({
		where: {
			email
		}
	});
	return deletedSubscriber;
};

const NewsLetterSubscribeServices = {
	createNewSubscriber,
	getSubscribers,
	unsubscribeSubscriber
};

export default NewsLetterSubscribeServices;
