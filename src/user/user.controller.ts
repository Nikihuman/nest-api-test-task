import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserGetMyProfileResponse } from './contracts/commands/get-user-profile';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getMyProfile(@UserEmail() email: string): Promise<UserGetMyProfileResponse> {
		const { user, posts } = await this.userService.getUserWithPosts(email);
		return {
			email: user.email,
			name: user.name,
			posts: posts.map((el) => ({
				...el,
				postId: el.id,
				createdAt: el.createdAt.toString(),
				updatedAt: el.updatedAt.toString(),
			})),
		};
	}
}
