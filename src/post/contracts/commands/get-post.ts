import { z } from 'zod';

export const GetPostResponseSchema = z.object({
	post: z.object({
		title: z.string(),
		content: z.string(),
		authorEmail: z.string().email(),
		postId: z.number(),
		createdAt: z.string(),
		updatedAt: z.string(),
	}),
	message: z.string(),
});

export type GetPostResponse = z.infer<typeof GetPostResponseSchema>;
