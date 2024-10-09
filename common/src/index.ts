import { z } from 'zod';

//user
const signupInput = z.object({
	email: z.string().email(),
	firstName: z.string(),
	lastName: z.string().optional(),
	password: z.string().min(6),
});

const signinInput = z.object({
	email: z.string().email(),
	password: z.string(),
});

// blog
const createBlogInput = z.object({
	title: z.string(),
	content: z.string(),
	authorId: z.string(),
});

const updateBlogInput = z.object({
	title: z.string(),
	content: z.string(),
	id: z.string(),
});

//user
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
//blog
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
