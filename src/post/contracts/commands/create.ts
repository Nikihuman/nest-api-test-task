import { z } from 'zod';
import {
	INVALID_CONTENT_MESSAGE,
	INVALID_TITLE_MESSAGE,
} from '../../constants/contracts-commands.constant';

export const CreatePostRequestSchema = z.object({
	title: z.string({ message: INVALID_TITLE_MESSAGE }).min(1, INVALID_TITLE_MESSAGE),
	content: z.string({ message: INVALID_CONTENT_MESSAGE }).min(1, INVALID_CONTENT_MESSAGE),
});

export const CreatePostResponseSchema = z.object({
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

export type CreatePostRequest = z.infer<typeof CreatePostRequestSchema>;

export type CreatePostResponse = z.infer<typeof CreatePostResponseSchema>;
