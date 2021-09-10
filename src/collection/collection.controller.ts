import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Controller, Get, Render, NotFoundException } from '@nestjs/common';
import { Collection } from './collection.entity';

@Controller('collections')
export class CollectionController {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  @Get()
  public async index() {
    return await this.em.find(Collection, {});
  }

  @Get('view')
  @Render('collection')
  public async view() {
    return {
      title: 'Collections',
      description: 'A list of all the collections.',
    };
  }
}
