import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { CliModule } from './modules/cli/cli.module';
import { CollectionModule } from './modules/collection/collection.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        debug: config.get('app.debug'),
        type: config.get('database.type'),
        dbName: config.get('database.name'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        user: config.get('database.username'),
        password: config.get('database.password'),
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        migrations: {
          tableName: 'migrations',
          path: join(__dirname, 'database/migrations'),
          pattern: /^[\w-]+\d+\.ts$/,
          transactional: true,
          allOrNothing: true,
          emit: 'ts',
        },
      }),
      inject: [ConfigService],
    }),
    CollectionModule,
    CliModule,
  ],
})
export class AppModule {}
