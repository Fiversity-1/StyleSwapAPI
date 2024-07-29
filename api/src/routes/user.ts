import { Request, Response } from 'express';
import { UserRouteParams } from '../types';

import { getConnection } from '../db';
import { User as UserDb } from '../db/User';

import { encrypt } from './helpful_helpers';

export async function postUser(req: Request<UserRouteParams, any, UserBodyParams>, res: Response) {
   const { userId } = req.params;
   
   const { location } = req.body;

   if (!userId) {
       res.status(400).json('Missing userId');
       return;
   }

   const userRepository = getConnection().getRepository(UserDb);

   const newUser = new UserDb();

   const encryptedLocation = encrypt(location);

   newUser.location = encryptedLocation;
   newUser.userId = userId;

   // Add picture logic

   const savedUser = await userRepository.save(newUser);

   res.status(201).json('Made a user');
}
