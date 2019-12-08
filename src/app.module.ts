import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostModule } from './modules/post/post.module'
import { SiteModule } from './modules/site/site.module';
import { SubjectModule } from './modules/subject/subject.module';


@Module({
  imports: [TypeOrmModule.forRoot(),PostModule, SiteModule, SubjectModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
