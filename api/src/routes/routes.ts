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
import { Router } from 'express';

// Health routes from ./health
import { dripCheck } from './health';

// Clothing related routes from ./clothing
import {
    postClothing, // adds a new clothing item
    getClothing, // searchs for clothing items
    getUserClothing, // gets all clothing items from a user
    deleteClothing, // removes a piece of clothing from a user
    getLikedClothing, // gets all of the liked clothing from a user
    patchClothing // edits a clothing item from a user
} from './clothing';

import {
    postUser, // adds a new user
    getUser, // gets user information
    swipe, // swipes (likes/dislikes) a clothing item
    block, // blocks another user
    unmatch_handles // unmatches from another user
} from './user';

export const router = Router(); // Makes a router and exports it so that it can be used in ../index.ts

///// GET ROUTES

// Checks connection with the database and server in general
router.get('/health', dripCheck);

// Gets all the clothes in the database from a specific user
router.get('/clothes/:userId', getUserClothing);

router.get('/user/:userId', getUser);

// Gets all the clothes in the database from a specific user
router.get('/clothes/liked/:userId', getLikedClothing);

router.get('/user/block/:userId1/:userId2', block);

router.get('/user/unmatch/:userId1/:userId2', unmatch_handles);

// Likes a piece of clothing
router.get('/clothes/like/:userId/:clotheId', swipe);

///// DELETE ROUTES
router.delete('/clothes/:userId/:clothingId', deleteClothing);

///// POST ROUTES

// Gets all the clothes, needs to be post because of large information
router.post('/clothes/search/:userId', getClothing);

// Adds a new piece of clothing to the database and returns the id given to the piece of clothing
router.post('/clothes/:userId', postClothing);

// Adds a new user to the database
router.post('/user/:userId', postUser);

///// PATCH ROUTES

// Updates clothing item
router.patch('/clothes/edit/:userId/:clothingId', patchClothing);
