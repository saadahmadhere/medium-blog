import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
	Bindings: {
		JWT_SECRET: string;
		DATABASE_URL: string; // to give a type to the environment variable, otherwise typsecript will complain.
	};
}>().basePath('/api/v1');

app.route('/user', userRouter);
app.route('/blog', blogRouter);

export default app;
