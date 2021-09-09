import { Migration } from '@mikro-orm/migrations';

export class Migration20210909123657 extends Migration {
  private tableName = 'collections';

  async up(): Promise<void> {
    await this.ctx.schema.createTable(this.tableName, (table) => {
      table.increments().primary();
      table.string('title', 255).notNullable();
      table.string('description', 255).nullable();
    });
  }

  async down(): Promise<void> {
    await this.ctx.schema.dropTableIfExists(this.tableName);
  }
}
