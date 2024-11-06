import { Module } from '@nestjs/common';
import DatabaseModule from '../database/database.module';
import AuthModule from '../auth/auth.module';
import V1UsersController from './controllers/v1-users.controller';
import UsersService from './services/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
  ],
  controllers: [V1UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule {}