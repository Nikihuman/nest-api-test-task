import { createZodDto } from 'nestjs-zod';
import { LoginRequestSchema } from '../contracts/commands/login';

export class LoginDTO extends createZodDto(LoginRequestSchema) {}
