import { LoginDTO } from 'src/auth/dto/login.dto';

export class ValidateUserCommand {
	constructor(public readonly dto: LoginDTO) {}
}
