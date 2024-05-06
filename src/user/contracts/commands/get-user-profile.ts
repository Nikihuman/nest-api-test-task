import { z } from 'zod';

export const GetMyProfileResponseSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	posts: z.array(
		z.object({
			title: z.string(),
			content: z.string(),
			authorEmail: z.string().email(),
			postId: z.number(),
			createdAt: z.string(),
			updatedAt: z.string(),
		}),
	),
});

export type UserGetMyProfileResponse = z.infer<typeof GetMyProfileResponseSchema>;
