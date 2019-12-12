import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostModule } from './modules/post/post.module'
import { SiteModule } from './modules/site/site.module';
import { SubjectModule } from './modules/subject/subject.module';
import { UserModule } from './modules/user/user.module';
import { ValidateUserMiddleware } from './core/middlewares/validate-user.middleware'
import { UserController } from './modules/user/user.controller'
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { CategoryModule } from './modules/category/category.module';


@Module({
  imports: [TypeOrmModule.forRoot(),PostModule, SiteModule, SubjectModule, UserModule, AuthModule, RoleModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(ValidateUserMiddleware)
    //   .exclude({ path: 'user', method: RequestMethod.PUT })
    //   .forRoutes(UserController)
  }
}
