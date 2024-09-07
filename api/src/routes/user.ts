import { Request, Response } from 'express';

import { getConnection } from '../db';
import { User as UserDb } from '../db/User';
import { Clothing as ClothingDb } from '../db/Clothing';

import {
    UserBodyParams,
    UserRouteParams,
    SwipeRouteParams,
    SwipeQueryParams
} from '../types';

import { encrypt } from './helpful_helpers';

export async function postUser(req: Request<UserRouteParams, any, UserBodyParams>, res: Response) {
    console.log("New User Added!");

    const { userId } = req.params;

    let { lat, lon, bio } = req.body;

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
    newUser.bio = bio;

    // Add picture logic

    const savedUser = await userRepository.save(newUser);

    res.status(201).json('Made a user');
}

export async function swipe(req: Request<SwipeRouteParams, any, any, SwipeQueryParams>, res: Response) {

    const { userId, clotheId } = req.params;

    let { like } = req.query;

    console.log(userId);
    console.log(clotheId);

    if (!userId || !clotheId) {
        res.status(400).json('Missing userId or clotheId');
	return;
    }

    const userRepository = getConnection().getRepository(UserDb);

    let user = await userRepository.findOne({ where: { userId} });

    if (!user) {
	res.status(404).json('No user found');
	return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);

    const clothe = await clothingRepository.findOne({ where: { clothingId: clotheId } });

    if (!clothe) {
	res.status(404).json('No Clothing item found');
	return;
    }

    const userId2 = clothe.userId;

    let user2 = await userRepository.findOne({ where: { userId: userId2 } });

    if (!user2) {
	res.status(500).json('Clothing item does not match an alive user');
	return;
    }

    // Some of the best code ever writtern!!!
    // I would like to thank my dad and my cat for this one!!!
    if (like !== false) {
	like = true;
    }

    // Like/Dislike the clothing item in user 1
    if (like) {
	user.liked.push(clotheId);
    } else {
	user.disliked.push(clotheId);
    	res.status(200).json('Clothing Item Disliked');
    }

    // Only liked clothes from here on
    // Has user 2 already liked something from user 1

    // Get all clothing items from user 1
    const userClothes = await clothingRepository.find({ where: { userId } });

    // Is one of their id's within user.liked?
    let matches = userClothes.filter(clothe => user2.liked.includes(clothe.clothingId));

    // Return the clothes
    res.status(200).json(matches);
}
