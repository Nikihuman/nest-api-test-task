import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserLoginResponse } from './contracts/commands/login';
import { UserRegisterResponse } from './contracts/commands/register';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('register')
	async register(@Body() dto: RegisterDTO): Promise<UserRegisterResponse> {
		const token = await this.authService.register(dto);
		if (!token) {
			throw new HttpException('custom message', HttpStatus.BAD_REQUEST);
		}
		return token;
	}

	@Post('login')
	@HttpCode(200)
	async login(@Body() dto: LoginDTO): Promise<UserLoginResponse> {
		const token = await this.authService.login(dto);
		if (!token) {
			throw new HttpException('custom message', HttpStatus.BAD_REQUEST);
		}
		return token;
	}
}
