import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.post('api/v1/signup', (c) => c.text('POST /'));
app.post('api/v1/signup', (c) => c.text('POST /'));
app.post('api/v1/blog', (c) => c.text('POST /'));
app.put('api/v1/blog', (c) => c.text('POST /'));
app.get('api/v1/blog/:id', (c) => c.text('POST /'));
app.get('api/v1/blog/bulk', (c) => c.text('POST /'));

export default app;
