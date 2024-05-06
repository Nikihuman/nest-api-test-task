import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersPostsQuery } from '../impl/get-user-posts.query';
import { PostRepository } from 'src/post/post.repository';

@QueryHandler(GetUsersPostsQuery)
export class GetUserPostsHandler implements IQueryHandler<GetUsersPostsQuery> {
	constructor(private readonly postRepository: PostRepository) {}

	async execute({ authorEmail }: GetUsersPostsQuery) {
		return this.postRepository.getUsersPosts(authorEmail);
	}
}
