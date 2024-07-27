import { Router } from 'express';

import { dripCheck } from './health';

export const router = Router();

router.get('/health', dripCheck);
