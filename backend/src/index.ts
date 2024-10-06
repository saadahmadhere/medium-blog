import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono<{
	Bindings: {
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

	// console.log('db url', dbUrl);
	const body = await c.req.json();

	await prisma.user.create({
		data: {
			email: body.email,
			password: body.password,
			firstName: body.firstName,
		},
	});

	console.log('body,', body);
	return c.text('sign up /');
});
app.post('api/v1/signin', (c) => c.text('sign in /'));
app.post('api/v1/blog', (c) => c.text('blog post /'));
app.put('api/v1/blog', (c) => c.text('blog put /'));
app.get('api/v1/blog/:id', (c) => c.text('blog id /'));
app.get('api/v1/blog/bulk', (c) => c.text('blog get /'));

export default app;
