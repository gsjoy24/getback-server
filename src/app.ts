import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(
	cors({
		origin: ['https://lost-and-found1.vercel.app/', 'http://localhost:3000'],
		credentials: true
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
	res.send({
		status: 'success',
		message: 'server for lost and find is running!'
	});
});

app.use('/api', router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
