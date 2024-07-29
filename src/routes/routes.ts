import { Router } from 'express';

import { dripCheck } from './health';
import {
    postClothing
} from './clothing';

export const router = Router();

// Checks connection with the database and server in general
router.get('/health', dripCheck);

// Adds a new piece of clothing to the database and returns the id given to the piece of clothing
router.post('/clothes/:userId', postClothing);
