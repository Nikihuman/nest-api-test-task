import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueryHandlers } from './queries/handlers';

@Module({
	controllers: [PostController],
	imports: [PrismaModule],
	providers: [PostService, PostRepository, ...QueryHandlers],
	exports: [...QueryHandlers],
})
export class PostModule {}
