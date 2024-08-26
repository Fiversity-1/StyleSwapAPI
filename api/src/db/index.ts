import { DataSource } from 'typeorm';

import { User } from './User';
import { Clothing } from './Clothing';

const BackendDataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres' || "postgres",
    host: process.env.DB_HOST! || "localhost",
    port: parseInt(process.env.DB_PORT!) || 5432,
    username: process.env.DB_USER || "dbdude",
    password: process.env.DB_PASSWORD || "PASSWORD",
    database: process.env.DB_DATABASE || "db",
    synchronize: true,
    logging: false,
    entities: [User, Clothing],
});

BackendDataSource.initialize()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log(err);
    });

export const getConnection = () => BackendDataSource;
