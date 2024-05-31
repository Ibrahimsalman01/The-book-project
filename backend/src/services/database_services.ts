import { EntityManager } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";
import config from "../mikro-orm.config";

export class DatabaseService {
    private static em: EntityManager;
    private static orm: MikroORM;

    constructor() {}

    public async init(): Promise<void> {
        console.log('problem 2');
        DatabaseService.orm = await MikroORM.init(config); 
        DatabaseService.em = DatabaseService.orm.em.fork();
    }

    public static getEntityManager(): EntityManager {
        if (!DatabaseService.em) {
            throw new Error("EntityManager is not initialized.");
        }
        return DatabaseService.em;
    }

    private async persistAndFlush(currEntity: any): Promise<void> {
        await DatabaseService.em.persist(currEntity).flush();
    }

    public async closeORM(): Promise<void> {
        await DatabaseService.orm.close(true);
    }

}
