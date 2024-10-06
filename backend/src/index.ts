import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';

const app = new Hono<{
	Bindings: {
		JWT_SECRET: string;
		DATABASE_URL: string; // to give a type to the environment variable, otherwise typsecript will complain.
	};
}>().basePath('/api/v1');

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

app.get('/', (c) => {
	return c.text('Hello Hono  adsf!');
});

app.post('/signup', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				firstName: body.firstName,
			},
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		c.status(200);
		return c.json({
			message: 'sign up successful',
			token,
		});
	} catch (error) {
		return c.json({ message: 'invalid' });
	}
});

app.post('/signin', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
				password: body.password,
			},
		});
		if (!user) {
			c.status(403);
			return c.json({ message: 'Incorrect credentials' });
		}
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ message: 'login succesfully', token });
	} catch (error) {
		return c.json({ message: (error as Error).message });
	}
});
app.post('/blog', (c) => c.text('blog post /'));
app.put('/blog', (c) => c.text('blog put /'));
app.get('/blog/:id', (c) => c.text('blog id /'));
app.get('/blog/bulk', (c) => c.text('blog get /'));

export default app;
