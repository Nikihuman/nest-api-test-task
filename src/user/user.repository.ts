import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getUser(userEmail: string): Promise<UserModel | null> {
		return this.prismaService.userModel.findFirst({ where: { email: userEmail } });
	}

	async getUserWithPosts(userEmail: string): Promise<UserModel | null> {
		this.prismaService.postModel.findMany({ where: { authorEmail: userEmail } });
		return this.prismaService.userModel.findFirst({ where: { email: userEmail } });
	}

	async createUser({ email, password, userName }: User): Promise<UserModel | null> {
		return this.prismaService.userModel.create({
			data: { email, name: userName, passwordHash: password },
		});
	}
}
