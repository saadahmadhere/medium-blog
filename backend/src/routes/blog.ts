import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
	Bindings: {
		JWT_SECRET: string;
		DATABASE_URL: string; // to give a type to the environment variable, otherwise typsecript will complain.
	};
	Variables: {
		authorId: string;
	};
}>();

blogRouter.use('/*', async (c, next) => {
	const authHeader = c.req.header('authorization') || '';
	const user = await verify(authHeader, c.env.JWT_SECRET);
	if (user) {
		c.set('authorId', String(user.id));
		next();
	} else {
		c.status(403);
		return c.json({ message: "user doen't exist" });
	}
});

blogRouter.post('/', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const authorId = c.get('authorId');

	try {
		const blog = await prisma.blog.create({
			data: {
				title: body.title,
				content: body.content,
				isPublished: body.isPublished,
				authorId,
			},
		});

		return c.json({
			id: blog.id,
		});
	} catch (error) {
		return c.json({ message: (error as Error).message });
	}
});

blogRouter.put('/', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	try {
		const blog = await prisma.blog.update({
			where: {
				id: body.id,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});

		return c.json({
			id: blog.id,
		});
	} catch (error) {
		return c.json({ message: (error as Error).message });
	}
});

blogRouter.get('/', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	try {
		const blog = await prisma.blog.findFirst({
			where: {
				id: body.id,
			},
		});
		return c.json({
			blog,
		});
	} catch (error) {
		return c.json({ message: (error as Error).message });
	}
});

blogRouter.get('/bulk', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	try {
		const allBlogs = await prisma.blog.findMany();
		const blogTitles =
			allBlogs.length > 0 ? allBlogs.map((blog) => blog.title) : [];
		return c.json({ blogs: blogTitles });
	} catch (error) {
		return c.json({ message: (error as Error).message });
	}
});
