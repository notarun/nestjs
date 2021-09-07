import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CollectionModule } from './collection/collection.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        dbName: config.get('database.name'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        user: config.get('database.username'),
        password: config.get('database.password'),
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['dist/**/*.entity.ts'],
      }),
      inject: [ConfigService],
    }),
    CollectionModule,
  ],
})
export class AppModule {}
