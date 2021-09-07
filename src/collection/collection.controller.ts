import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Controller, Get, NotFoundException } from '@nestjs/common';
import { Collection } from './collection.entity';

@Controller('collections')
export class CollectionController {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  @Get()
  public async index() {
    try {
      const collection = await this.em.findOneOrFail(Collection, 2);
      return collection;
    } catch (e) {
      throw new NotFoundException('Collection not found');
    }
  }
}
