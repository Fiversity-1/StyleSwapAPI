"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const health_1 = require("./health");
const clothing_1 = require("./clothing");
const user_1 = require("./user");
exports.router = (0, express_1.Router)();
///// GET
// Checks connection with the database and server in general
exports.router.get('/health', health_1.dripCheck);
// Gets all the clothes in the database from a specific user
exports.router.get('/clothes/:userId', clothing_1.getUserClothing);
// Gets all the clothes in the database from a specific user
exports.router.get('/clothes/liked/:userId', clothing_1.getLikedClothing);
// Likes a piece of clothing
exports.router.get('/clothes/like/:userId/:clothingId', clothing_1.likeClothing);
// Dislikes a piece of clothing
exports.router.get('/clothes/dislike/:userId/:clothingId', clothing_1.dislikeClothing);
///// DELETE
exports.router.delete('/clothes/:userId/:clothingId', clothing_1.deleteClothing);
///// POST
// Gets all the clothes, needs to be post because of large information
exports.router.post('/clothes/search/:userId', clothing_1.getClothing);
// Adds a new piece of clothing to the database and returns the id given to the piece of clothing
exports.router.post('/clothes/:userId', clothing_1.postClothing);
// Adds a new user to the database
exports.router.post('/user/:userId', user_1.postUser);
///// PATCH
// Updates clothing item
exports.router.patch('/clothes/edit/:userId/:clothingId', clothing_1.patchClothing);
