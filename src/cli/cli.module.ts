import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { MigrationService } from './migration/migration.service';

@Module({
  imports: [ConsoleModule],
  providers: [MigrationService],
})
export class CliModule {}
