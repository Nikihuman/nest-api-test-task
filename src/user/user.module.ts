import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommandsHandler } from './commands/handlers';
import { PostModule } from 'src/post/post.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [CqrsModule, PrismaModule, PostModule, ConfigModule],
	controllers: [UserController],
	providers: [UserRepository, UserService, ...CommandsHandler],
	exports: [...CommandsHandler],
})
export class UserModule {}
