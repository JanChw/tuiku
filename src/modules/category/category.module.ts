import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { PostService } from '../post/post.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), PostModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
