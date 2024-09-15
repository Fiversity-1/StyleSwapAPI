"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
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

src/route/routes.ts

This is where all the routes are added for the entire backend,
however not where the functions themselves are defined.

Following the files within this directory will lead you to those, or simply find them in the below imports.

*/
const express_1 = require("express");
// Health routes from ./health
const health_1 = require("./health");
// Clothing related routes from ./clothing
const clothing_1 = require("./clothing");
const user_1 = require("./user");
exports.router = (0, express_1.Router)(); // Makes a router and exports it so that it can be used in ../index.ts
///// GET ROUTES
// Checks connection with the database and server in general
exports.router.get('/health', health_1.dripCheck);
// Gets all the clothes in the database from a specific user
exports.router.get('/clothes/:userId', clothing_1.getUserClothing);
// Gets all the clothes in the database from a specific user
exports.router.get('/clothes/liked/:userId', clothing_1.getLikedClothing);
exports.router.get('/user/block/:userId1/:userId2', user_1.block);
exports.router.get('/user/unmatch/:userId1/:userId2', user_1.unmatch_handles);
// Likes a piece of clothing
exports.router.get('/clothes/like/:userId/:clotheId', user_1.swipe);
///// DELETE ROUTES
exports.router.delete('/clothes/:userId/:clothingId', clothing_1.deleteClothing);
///// POST ROUTES
// Gets all the clothes, needs to be post because of large information
exports.router.post('/clothes/search/:userId', clothing_1.getClothing);
// Adds a new piece of clothing to the database and returns the id given to the piece of clothing
exports.router.post('/clothes/:userId', clothing_1.postClothing);
// Adds a new user to the database
exports.router.post('/user/:userId', user_1.postUser);
///// PATCH ROUTES
// Updates clothing item
exports.router.patch('/clothes/edit/:userId/:clothingId', clothing_1.patchClothing);
