import { EntityManager, MikroORM, Options } from "@mikro-orm/postgresql";
require('dotenv').config();

// DB connection URL
const DB_URL = process.env.DB_URL;

// DB injection service
export interface Services {
    orm: MikroORM;
    em: EntityManager
}

let cache: Services;

export async function initORM(config: Options): Promise<Services> {
    if (cache) {
        return cache;
    }

    const orm = await MikroORM.init(config);

    return cache = {
        orm,
        em: orm.em
    };
}

export {
    DB_URL
};