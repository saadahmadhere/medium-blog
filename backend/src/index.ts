import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';

const app = new Hono<{
	Bindings: {
		JWT_SECRET: string;
		DATABASE_URL: string; // to give a type to the environment variable, otherwise typsecript will complain.
	};
}>();

app.get('/', (c) => {
	return c.text('Hello Hono  adsf!');
});

app.post('api/v1/signup', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	const user = await prisma.user.create({
		data: {
			email: body.email,
			password: body.password,
			firstName: body.firstName,
		},
	});

	const token = await sign({ id: user.id }, c.env.JWT_SECRET);

	return c.json({
		message: 'sign up successful',
		token,
	});
});
app.post('api/v1/signin', (c) => c.text('sign in /'));
app.post('api/v1/blog', (c) => c.text('blog post /'));
app.put('api/v1/blog', (c) => c.text('blog put /'));
app.get('api/v1/blog/:id', (c) => c.text('blog id /'));
app.get('api/v1/blog/bulk', (c) => c.text('blog get /'));

export default app;
