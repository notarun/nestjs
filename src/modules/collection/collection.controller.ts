import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Controller, Get, Render } from '@nestjs/common';
import { Collection } from './collection.entity';

@Controller()
export class CollectionController {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  @Get('collections.json')
  public async index() {
    const [collections, count] = await this.em.findAndCount(
      Collection,
      {},
      {
        limit: 10,
        offset: 0,
      },
    );

    return {
      data: collections,
      count,
    };
  }

  @Get('collections.html')
  @Render('collection')
  public async view() {
    return {
      title: 'Collections',
      description: 'A list of all the collections.',
    };
  }
}
