import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/logger.middleware';
@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule, PrismaModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 3. Add the 'configure' method
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // 4. Apply our middleware
      .forRoutes('*');          // 5. Apply it to every route
  }
}
