import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PostModel, UserModel } from '@prisma/client';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { User } from './user.entity';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersPostsQuery } from 'src/post/queries/impl/get-user-posts.query';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
	constructor(
		private userRepository: UserRepository,
		private configService: ConfigService,
		private queryBus: QueryBus,
	) {}

	async getUser(email: string): Promise<UserModel | null> {
		return this.userRepository.getUser(email);
	}

	async getUserWithPosts(
		email: string,
	): Promise<{ user: Omit<UserModel, 'passwordHash'>; posts: PostModel[] }> {
		const { passwordHash, ...userInfo } = (await this.userRepository.getUser(email)) as UserModel;
		const userPosts = await this.queryBus.execute<{}, PostModel[]>(new GetUsersPostsQuery(email));
		return {
			user: { ...userInfo },
			posts: userPosts,
		};
	}

	async createUser({ email, password, userName }: RegisterDTO): Promise<UserModel | null> {
		const isExistedUser = await this.getUser(email);
		if (isExistedUser) {
			return null;
		}
		const newUser = new User(email, userName);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, salt);
		return this.userRepository.createUser(newUser);
	}

	async validateUser({ email, password }: LoginDTO): Promise<boolean> {
		const isExisted = await this.getUser(email);
		if (!isExisted) {
			return false;
		}
		const userToValidate = new User(isExisted.email, isExisted.name, isExisted.passwordHash);
		return userToValidate.checkPassword(password);
	}
}
