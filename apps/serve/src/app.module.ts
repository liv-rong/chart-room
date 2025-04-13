import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './shared/redis/redis.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
