import { Hono } from 'hono';

export const blogRouter = new Hono<{
	Bindings: {
		JWT_SECRET: string;
		DATABASE_URL: string; // to give a type to the environment variable, otherwise typsecript will complain.
	};
}>();

blogRouter.get('/', (c) => {
	return c.text('this is /blog');
});
