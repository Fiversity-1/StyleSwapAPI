"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
/*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡶⢶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⣠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠼⠧⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣼⠇⠀⠀⠸⣧⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣴⠞⠋⢀⣠⡴⢦⣄⡀⠙⠳⣦⣀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣠⡴⠟⠉⣀⣤⠾⠛⠁⠀⠀⠈⠛⠷⣦⣀⠉⠻⢦⣄⡀⠀⠀⠀
⢀⣤⠶⠛⣁⣤⠶⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠶⣤⣈⠛⠶⣤⡀
⠸⣧⣶⣿⣯⣤⣴⠶⠶⣦⣤⣤⣤⣤⣤⣤⣤⣤⣴⠶⠶⣦⣤⣽⣿⣶⣼⠇
⠀⠀⠀⠀⠀⠀⠻⠶⠶⠟⠀⠀⠀⠀⠀⠀⠀⠀⠻⠶⠶⠟⠀⠀⠀⠀⠀⠀


StyleSwapAPI
------------

src/db/index.ts

Sets up the database using env variables and TypeORM.

Tables are defined within the related files, i.e. the User table is set up in ./User.ts relative to this file.

Most debugging for the database, can be done be either the journal or the health route.

When adding to one of the tables the database needs to be reset (when not using docker).
To do this run the following commands:

sudo -u postgres psql

drop database <database_name>;

create database <database_name> owner <database_owner>;

*/
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Clothing_1 = require("./Clothing");
const Image_1 = require("./Image");
// Makes a database with the following inputs
const BackendDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Clothing_1.Clothing, Image_1.Image],
});
// Logs if the database was successfully made for the journal
BackendDataSource.initialize()
    .then(() => {
    console.log('Connected to the database');
})
    .catch((err) => {
    console.log(err);
});
const getConnection = () => BackendDataSource;
exports.getConnection = getConnection;
