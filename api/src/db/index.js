"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Clothing_1 = require("./Clothing");
const Image_1 = require("./Image");
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
BackendDataSource.initialize()
    .then(() => {
    console.log('Connected to the database');
})
    .catch((err) => {
    console.log(err);
});
const getConnection = () => BackendDataSource;
exports.getConnection = getConnection;
