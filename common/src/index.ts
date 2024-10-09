import { z } from 'zod';

//user
export const signupInput = z.object({
	email: z.string().email(),
	firstName: z.string(),
	lastName: z.string().optional(),
	password: z.string().min(6),
});

export const signinInput = z.object({
	email: z.string().email(),
	password: z.string(),
});

// blog
export const createBlogInput = z.object({
	title: z.string(),
	content: z.string(),
});

export const updateBlogInput = z.object({
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
