import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreatePostDTO } from './dto/create.dto';
import { CreatePostResponse } from './contracts/commands/create';
import { UpdatePostResponse } from './contracts/commands/update';
import { UpdatePostDTO } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { PostService } from './post.service';
import { PostDeleteResponse } from './contracts/commands/delete';
import { GetPostResponse } from './contracts/commands/get-post';
import {
	CREATE_POST_MESSAGE,
	DELETE_POST_MESSAGE,
	GET_POST_BY_ID_MESSAGE,
	UPDATE_POST_MESSAGE,
	createPostResponse,
} from './constants/post-controller.constants';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createPost(
		@Body() dto: CreatePostDTO,
		@UserEmail() email: string,
	): Promise<CreatePostResponse> {
		const postModel = await this.postService.create(dto, email);
		return createPostResponse(postModel, CREATE_POST_MESSAGE);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async updatePost(
		@Param('id') postId: string,
		@Body() dto: UpdatePostDTO,
		@UserEmail() email: string,
	): Promise<UpdatePostResponse> {
		const postModel = await this.postService.update(dto, email, Number.parseInt(postId));
		return createPostResponse(postModel, UPDATE_POST_MESSAGE);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deletePost(@Param('id') postId: string): Promise<PostDeleteResponse> {
		const postModel = await this.postService.delete(Number.parseInt(postId));
		return createPostResponse(postModel, DELETE_POST_MESSAGE);
	}

	@Get(':id')
	async getPostById(@Param('id') postId: string): Promise<GetPostResponse> {
		const postModel = await this.postService.getPostById(Number.parseInt(postId));
		return createPostResponse(postModel, GET_POST_BY_ID_MESSAGE(postId));
	}
}
