import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'collections' })
export class Collection {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description?: string;
}
