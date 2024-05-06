import { createZodDto } from 'nestjs-zod';
import { UpdatePostRequestSchema } from '../contracts/commands/update';

export class UpdatePostDTO extends createZodDto(UpdatePostRequestSchema) {}
