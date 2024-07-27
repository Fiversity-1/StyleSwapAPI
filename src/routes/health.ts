import { Request, Response } from 'express';

export async function dripCheck(req: Request, res: Response) {
    res.status(200).json('EVERYTHING IS A-OKAY');
}
