import { EntityManager, MikroORM, Options } from '@mikro-orm/postgresql';
import config from './mikro-orm.config.js';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
/*   article: EntityRepository<Article>;
  user: EntityRepository<User>;
  tag: EntityRepository<Tag>; */
}



let cache: Services;

export async function initORM(config: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(config);

  // save to cache before returning
  return cache = {
    orm,
    em: orm.em,
    /* article: orm.em.getRepository(Article),
    user: orm.em.getRepository(User),
    tag: orm.em.getRepository(Tag), */
  };
}