import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from 'src/user/user.service';
import { CreateUserCommand } from '../impl/create-user.command';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CREATE_USER_EXCEPTION } from '../constants/exception-messages.constants';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(private readonly userService: UserService) {}

	async execute({ dto }: CreateUserCommand) {
		const newUser = await this.userService.createUser(dto);
		if (!newUser) {
			throw new HttpException(CREATE_USER_EXCEPTION, HttpStatus.BAD_REQUEST);
		}
	}
}
