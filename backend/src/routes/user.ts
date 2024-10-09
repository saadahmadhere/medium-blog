import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@saadahmadhere/medium-common';

export const userRouter = new Hono<{
	Bindings: {
		JWT_SECRET: string;
		DATABASE_URL: string; // to give a type to the environment variable, otherwise typsecript will complain.
	};
}>();

userRouter.get('/', (c) => {
	return c.text('Hello Hono  adsf!');
});

userRouter.post('/signup', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: 'incorrect creds' });
	}

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

userRouter.post('/signin', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: 'incorrect creds' });
	}

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
