import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from 'src/user/user.service';

import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidateUserCommand } from '../impl/validate-user.command';
import { VALIDATE_USER_EXCEPTION } from '../constants/exception-messages.constants';

@CommandHandler(ValidateUserCommand)
export class ValidateUserHandler implements ICommandHandler<ValidateUserCommand> {
	constructor(private readonly userService: UserService) {}

	async execute(query: ValidateUserCommand): Promise<boolean> {
		const result = await this.userService.validateUser(query.dto);
		if (!result) {
			throw new HttpException(VALIDATE_USER_EXCEPTION, HttpStatus.BAD_REQUEST);
		}
		return result;
	}
}
