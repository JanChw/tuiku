import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { SiteModule } from '../site/site.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SiteModule, SubjectModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
