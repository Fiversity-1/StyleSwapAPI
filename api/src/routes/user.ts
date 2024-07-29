import { Request, Response } from 'express';
import { UserRouteParams } from '../types';

import { getConnection } from '../db';
import { User as UserDb } from '../db/User';

export async function postUser(req: Request<UserRouteParams, any, any>, res: Response) {
    const { userId } = req.params;
   
   if (!userId) {
       res.status(400).json('Missing userId');
       return;
   }

   const userRepository = getConnection.getRepository(UserDb);

   const newUser = new UserDb();

   // Add picture logic
   // 
