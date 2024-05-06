import { RegisterDTO } from 'src/auth/dto/register.dto';

export class CreateUserCommand {
	constructor(public readonly dto: RegisterDTO) {}
}
