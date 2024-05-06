import { PostModel } from '@prisma/client';

export const createPostResponse = (postModel: PostModel, message: string) => {
	const { id, createdAt, updatedAt, ...updatedPost } = postModel;
	return {
		post: {
			postId: id,
			updatedAt: updatedAt.toString(),
			createdAt: createdAt.toString(),
			...updatedPost,
		},
		message,
	};
};

export const CREATE_POST_MESSAGE = 'Post successfully created';
export const UPDATE_POST_MESSAGE = 'Post successfully updated';
export const DELETE_POST_MESSAGE = 'Post successfully deleted';
export const GET_POST_BY_ID_MESSAGE = (postId: string | number) => `Post with '${postId}' ID`;
