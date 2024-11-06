import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { configSchema } from './utils/schemas/config.schema';
import AuthModule from './auth/auth.module';
import DatabaseModule from './database/database.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configSchema,
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 100,
    }]),
    AuthModule,
    DatabaseModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
