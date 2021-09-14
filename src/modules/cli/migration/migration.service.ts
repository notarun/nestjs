import { MikroORM } from '@mikro-orm/core';
import { IMigrator } from '@mikro-orm/core/typings';
import { AbstractSqlConnection } from '@mikro-orm/mysql';
import { Command, Console, createSpinner } from 'nestjs-console';
import { join } from 'path';
import * as ora from 'ora';

@Console({
  command: 'migration',
})
export class MigrationService {
  private spinner: ora.Ora;
  private migrator: IMigrator;
  private migrationsDir: string;

  constructor(private readonly orm: MikroORM) {
    this.spinner = createSpinner();
    this.migrator = orm.getMigrator();
    this.migrationsDir = orm.config.get('migrations').path;
  }

  @Command({
    command: 'new',
    description: 'Create a new migration file',
  })
  async new(): Promise<void> {
    this.spinner.start('Creating migration file');

    const { fileName } = await this.migrator.createMigration(
      this.migrationsDir,
      true,
    );

    this.spinner.succeed(`Created ${join(this.migrationsDir, fileName)}`);
  }

  @Command({
    command: 'up [name]',
    description: 'Run the database migrations',
  })
  async up(name?: string): Promise<void> {
    await this.migrator.up(name);
  }

  @Command({
    command: 'down',
    description: 'Migrate one step down',
  })
  async down(): Promise<void> {
    this.migrator.down();
  }

  @Command({
    command: 'refresh',
    description: 'Drop all tables and re-run all migrations',
  })
  async refresh(): Promise<void> {
    const knex = (
      this.orm.em.getConnection() as AbstractSqlConnection
    ).getKnex();

    const tables = await knex
      .queryBuilder()
      .select('table_name')
      .from('information_schema.tables')
      .where({ table_schema: this.orm.em.config.get('dbName') });

    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    tables.forEach(
      async (table) => await knex.schema.dropTableIfExists(table.table_name),
    );
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

    this.spinner.succeed('Dropped all the tables\n');

    await this.up();
  }
}
