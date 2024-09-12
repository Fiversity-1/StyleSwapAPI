import { DataSource } from 'typeorm';

import { User } from './User';
import { Clothing } from './Clothing';
import { Image } from './Image';

const BackendDataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Clothing, Image],
});

BackendDataSource.initialize()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log(err);
    });

export const getConnection = () => BackendDataSource;
