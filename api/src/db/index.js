"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Clothing_1 = require("./Clothing");
const BackendDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "dbdude",
    password: process.env.DB_PASSWORD || "PASSWORD",
    database: process.env.DB_DATABASE || "db",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Clothing_1.Clothing],
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
