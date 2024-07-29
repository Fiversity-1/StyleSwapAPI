import { Request, Response } from 'express';

import { getConnection } from '../db';

export async function dripCheck(req: Request, res: Response) {
    try {
        await getConnection().query('SELECT 1');
        res.status(200).json('EVERYTHING IS A-OKAY');
    } catch (err) {
        res.status(503).json('ERROR: ' + err);
    }
}
