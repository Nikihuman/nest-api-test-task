import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create.dto';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { PostModel } from '@prisma/client';
import { UpdatePostDTO } from './dto/update.dto';
import {
	NO_SUCH_POST_ERROR_MESSAGE,
	UPDATE_ERROR_MESSAGE,
} from './constants/post-service.constants';

@Injectable()
export class PostService {
	constructor(private readonly postRepository: PostRepository) {}

	async create({ content, title }: CreatePostDTO, authorEmail: string): Promise<PostModel> {
		const newPost = new Post(title, authorEmail, content);
		return this.postRepository.create(newPost);
	}

	async update(dto: UpdatePostDTO, authorEmail: string, postId: number): Promise<PostModel> {
		const userPosts = await this.postRepository.getUsersPosts(authorEmail);
		const isExistedPost = userPosts.find((el) => el.id === postId);
		if (!isExistedPost) {
			throw new HttpException(UPDATE_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
		}
		return this.postRepository.update(dto, postId);
	}

	async delete(postId: number): Promise<PostModel> {
		const isExistedPost = await this.postRepository.getPostById(postId);
		if (!isExistedPost) {
			throw new HttpException(NO_SUCH_POST_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
		}
		return this.postRepository.delete(postId);
	}

	async getPostById(postId: number): Promise<PostModel> {
		const isExistedPost = await this.postRepository.getPostById(postId);
		if (!isExistedPost) {
			throw new HttpException(NO_SUCH_POST_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
		}
		return isExistedPost;
	}
}
