import { createZodDto } from 'nestjs-zod';
import { RegisterRequestSchema } from '../contracts/commands/register';

export class RegisterDTO extends createZodDto(RegisterRequestSchema) {}
