import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import PgService from './services/pg.service';
import RefreshTokens from './entities/refresh-tokens.entity';
import RefreshToken from './entities/refresh-tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        synchronize: true,
        entities: [
          User,
          RefreshToken
        ]
      })
    }),
    TypeOrmModule.forFeature([
      User,
      RefreshToken
    ])
  ],
  exports: [PgService],
  providers: [PgService],
})
export default class DatabaseModule {}
