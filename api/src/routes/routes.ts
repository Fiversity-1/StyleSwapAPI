import { Router } from 'express';

import { dripCheck } from './health';

import {
    postClothing,
    getClothing,
    getUserClothing,
    deleteClothing,
    likeClothing,
    dislikeClothing,
    getLikedClothing
} from './clothing';

import {
    postUser
} from './user';

export const router = Router();

///// GET

// Checks connection with the database and server in general
router.get('/health', dripCheck);

// Gets all the clothes in the database from a specific user
router.get('/clothes/:userId', getUserClothing);

// Gets all the clothes in the database from a specific user
router.get('/clothes/liked/:userId', getLikedClothing);

// Likes a piece of clothing
router.get('/clothes/like/:userId/:clothingId', likeClothing);

// Dislikes a piece of clothing
router.get('/clothes/dislike/:userId/:clothingId', dislikeClothing);

///// DELETE
router.delete('/clothes/:userId/:clothingId', deleteClothing);

///// POST

// Gets all the clothes, needs to be post because of large information
router.post('/clothes/search/:userId', getClothing);

// Adds a new piece of clothing to the database and returns the id given to the piece of clothing
router.post('/clothes/:userId', postClothing);

// Adds a new user to the database
router.post('/user/:userId', postUser);

///// PATCH

// Updates clothing item
router.patch('/clothes/edit/:userId/:clothingId', patchClothing);
