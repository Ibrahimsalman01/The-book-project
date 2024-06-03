import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { DB_URL } from './config/database.config';

const config: Options = {
    driver: PostgreSqlDriver,
    clientUrl: DB_URL,
    driverOptions: {
        connection: {
            ssl: true
        }
    },
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    extensions: [EntityGenerator],
    debug: true
};

export default config;
