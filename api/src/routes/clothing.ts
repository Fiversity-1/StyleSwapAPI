import { Request, Response } from 'express';
import { UserRouteParams } from '../types';

import { getConnection } from '../db';
import { Clothing as ClothingDb } from '../db/Clothing';
import { User as UserDb } from '../db/User';

export async function postClothing(req: Request<UserRouteParams, any, ClothingBodyParams>, res: Response) {
    const { userId } = req.params;
    const { 
        colour,
        size,
        condition,
        gender,
        brand,
        style,
        bio,
        type
    } = req.body;

    if (!userId) {
        res.status(400).json('Missing userId');
        return;
    }
    
    if (!colour || !size || !condition || !type || !bio) {
        res.status(400).json('Missing information');
    }

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    
    const newItem = new ClothingDb();

    newItem.sizee = size;
    newItem.gender = gender;
    newItem.colour = colour;
    newItem.condition = condition;
    newItem.brand = brand;
    newItem.style = style;
    newItem.typee = type;
    newItem.bio = bio;
    newItem.userId = userId;

    const savedItem = await clothingRepository.save(newItem)

    res.status(201).json({ itemId: savedItem.clothingId });
}

    
