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

app.use('/blog/*', async (c, next) => {
	// get the header
	const header = c.req.header('authorization') || '';

	const token = header.split(' ')[1];

	// verify the header
	const decodedPayload = await verify(token, c.env.JWT_SECRET);

	if (decodedPayload.id) {
		// if the header is correct, proceed.
		next();
	} else {
		// if not, return 403 status code.
		c.status(403);
		return c.json({ error: 'unauthorized' });
	}
});

app.post('/blog', (c) => c.text('blog post /'));
app.put('/blog', (c) => c.text('blog put /'));
app.get('/blog/:id', (c) => c.text('blog id /'));
app.get('/blog/bulk', (c) => c.text('blog get /'));

export default app;
