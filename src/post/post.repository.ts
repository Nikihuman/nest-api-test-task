import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { PostModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDTO } from './dto/update.dto';

@Injectable()
export class PostRepository {
	constructor(private prismaService: PrismaService) {}

	async create({ authorEmail, content, title }: Post): Promise<PostModel> {
		return this.prismaService.postModel.create({
			data: { content, title, author: { connect: { email: authorEmail } } },
		});
	}

	async getUsersPosts(authorEmail: string): Promise<PostModel[]> {
		return this.prismaService.postModel.findMany({ where: { authorEmail } });
	}

	async update({ content, title }: UpdatePostDTO, postId: number): Promise<PostModel> {
		return this.prismaService.postModel.update({ where: { id: postId }, data: { content, title } });
	}

	async delete(postId: number): Promise<PostModel> {
		return this.prismaService.postModel.delete({ where: { id: postId } });
	}

	async getPostById(postId: number): Promise<PostModel | null> {
		return this.prismaService.postModel.findFirst({ where: { id: postId } });
	}
}
