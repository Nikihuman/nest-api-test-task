import { z } from 'zod';
import {
	INVALID_CONTENT_MESSAGE,
	INVALID_TITLE_MESSAGE,
} from '../../constants/contracts-commands.constant';

export const UpdatePostRequestSchema = z.object({
	title: z.string({ message: INVALID_TITLE_MESSAGE }).min(1, INVALID_TITLE_MESSAGE).optional(),
	content: z
		.string({ message: INVALID_CONTENT_MESSAGE })
		.min(1, INVALID_CONTENT_MESSAGE)
		.optional(),
});

export const UpdatePostResponseSchema = z.object({
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

export type UpdatePostRequest = z.infer<typeof UpdatePostRequestSchema>;

export type UpdatePostResponse = z.infer<typeof UpdatePostResponseSchema>;
