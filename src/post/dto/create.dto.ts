import { createZodDto } from 'nestjs-zod';
import { CreatePostRequestSchema } from '../contracts/commands/create';

export class CreatePostDTO extends createZodDto(CreatePostRequestSchema) {}
