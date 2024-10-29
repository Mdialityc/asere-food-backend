import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'vaXKRzqk.4',
      database: 'asere-food-db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
