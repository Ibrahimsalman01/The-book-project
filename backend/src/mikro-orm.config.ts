import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
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
    debug: true
};

export default config;
