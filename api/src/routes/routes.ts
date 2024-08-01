import { Router } from 'express';

import { dripCheck } from './health';

import {
    postClothing,
    getClothing
} from './clothing';

import {
    postUser
} from './user';

export const router = Router();

///// GET

// Checks connection with the database and server in general
router.get('/health', dripCheck);

///// POST

// Gets all the clothes, needs to be post because of large information
router.post('/clothes/search/:userId', getClothing);

// Adds a new piece of clothing to the database and returns the id given to the piece of clothing
router.post('/clothes/:userId', postClothing);

// Adds a new user to the database
router.post('/user/:userId', postUser);
