import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import { ValidateUserCommand } from 'src/user/commands/impl/validate-user.command';
import { CreateUserCommand } from 'src/user/commands/impl/create-user.command';

@Injectable()
export class AuthService {
	constructor(
		private commandBus: CommandBus,
		private jwtService: JwtService,
	) {}

	async login(dto: LoginDTO) {
		await this.commandBus.execute(new ValidateUserCommand(dto));
		const payload = { email: dto.email };
		return { accessToken: await this.jwtService.signAsync(payload) };
	}

	async register(dto: RegisterDTO) {
		await this.commandBus.execute(new CreateUserCommand(dto));
		const payload = { email: dto.email };
		return { accessToken: await this.jwtService.signAsync(payload) };
	}
}
