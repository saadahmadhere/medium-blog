import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { updateBlogInput, createBlogInput } from '@saadahmadhere/medium-common';

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
	try {
		const user = await verify(authHeader, c.env.JWT_SECRET);
		if (user) {
			c.set('authorId', String(user.id));
			await next();
		} else {
			c.status(403);
			return c.json({ message: "user doen't exist" });
		}
	} catch (error) {
		c.status(403);
		return c.json({ message: 'user not logged in' });
	}
});

blogRouter.post('/', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const authorId = c.get('authorId');
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: 'incorrect creds' });
	}
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

	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: 'incorrect creds' });
	}

	try {
		await prisma.blog.update({
			where: {
				id: body.id,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});

		return c.json({
			message: 'blog updated successfully',
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
		const allBlogs = await prisma.blog.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				isPublished: true,
				author: {
					select: {
						firstName: true,
						id: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
		console.log({ allBlogs });
		return c.json({ blogs: allBlogs });
	} catch (error) {
		return c.json({ message: (error as Error).message });
	}
});

blogRouter.get('/:id', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const blogId = c.req.param('id');

	try {
		const blog = await prisma.blog.findFirst({
			where: {
				id: blogId,
			},
		});
		return c.json({
			blog,
		});
	} catch (error) {
		return c.json({ message: (error as Error).message });
	}
});
