import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { configSchema } from './utils/schemas/config.schema';
import AuthModule from './auth/auth.module';
import DatabaseModule from './database/database.module';
import UsersModule from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProductCombosModule } from './product-combos/product-combos.module';
import { ProductInventoriesModule } from './product-inventories/product-inventories.module';
import { ProductModule } from './products/product.module';
import { RolesModule } from './roles/roles.module';
import { ZonesModule } from './zones/zones.module';

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
    CategoriesModule,
    DatabaseModule,
    PermissionsModule,
    ProductCombosModule,
    ProductInventoriesModule,
    ProductModule,
    RolesModule,
    UsersModule,
    ZonesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
