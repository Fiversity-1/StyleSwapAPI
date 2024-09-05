import { Request, Response } from 'express';

import { getConnection } from '../db';
import { User as UserDb } from '../db/User';

import {
    UserBodyParams,
    UserRouteParams
} from '../types';

import { encrypt } from './helpful_helpers';

export async function postUser(req: Request<UserRouteParams, any, UserBodyParams>, res: Response) {

    console.log("New User Added!");

    const { userId } = req.params;

    let { lat, lon } = req.body;

    if (!lat || !lon) {
        res.status(400).json('Missing location, send the addy');
        return;
    }

    if (!userId) {
        res.status(400).json('Missing userId');
        console.warn("Missing userId when adding a user!");
        return;
    }

    const userRepository = getConnection().getRepository(UserDb);

    const newUser = new UserDb();

    newUser.lat = encrypt(lat);
    newUser.lon = encrypt(lon);

    newUser.userId = userId;
    newUser.picture = "help";

    // Add picture logic

    const savedUser = await userRepository.save(newUser);

    res.status(201).json('Made a user');
}
