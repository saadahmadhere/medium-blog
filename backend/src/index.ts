import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.post('api/v1/signup', (c) => c.text('sign up /'));
app.post('api/v1/signin', (c) => c.text('sign in /'));
app.post('api/v1/blog', (c) => c.text('blog post /'));
app.put('api/v1/blog', (c) => c.text('blog put /'));
app.get('api/v1/blog/:id', (c) => c.text('blog id /'));
app.get('api/v1/blog/bulk', (c) => c.text('blog get /'));

export default app;
