import { Request, Response } from 'express';
import { NotBrackets } from 'typeorm';

import type { UserRouteParams, ClothingBodyParams, ClothingRouteParams } from '../types';
import {
    UserRouteParams,
    ClothingBodyParams,
    ClothingGetBodyParams,
    ClothingRouteParams    
} from '../types';

import { getConnection } from '../db';
import { Clothing as ClothingDb } from '../db/Clothing';
import { User as UserDb } from '../db/User';
import { encrypt, decrypt, operationExtraction } from './helpful_helpers';

export async function postClothing(req: Request<UserRouteParams, any, ClothingBodyParams>, res: Response) {
    const { userId } = req.params;
    const { 
        colour,
        size,
        condition,
        gender,
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
        return;
    }

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    
    const newItem = new ClothingDb();

    newItem.size = size;
    newItem.gender = gender;
    newItem.colour = colour;
    newItem.condition = condition;
    newItem.style = style;
    newItem.type = type;
    newItem.bio = bio;
    newItem.userId = userId;

    const savedItem = await clothingRepository.save(newItem)

    res.status(201).json({ itemId: savedItem.clothingId });
}

/*
 * getClothing
 * ===========
 *
 *  ~ Function used in {{url}}/api/clothes/search/:userID
 *
 *  Should return information so that the front end can display clothes (pretty much just the entire database entry for each item).
 */
export async function getClothing(req:Request<UserRouteParams, any, ClothingGetBodyParams>, res: Response) {
    const { userId } = req.params;
    let amount = req.query.amount ?? 20;

    const {
        colour,
        size,
        condition,
        gender,
        style,
        type,
        distance,
        search
    } = req.body;

    // Get the user and make sure they are legit
    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });
    
    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    // Get the previous liked and disliked items from that user so we can't give dups
    const liked = user.liked;
    const disliked = user.liked;

    // Get the location of the user so we can make sure the clothes are close
    let loc = decrypt(user.location);

    const clothingRepository = getConnection().getRepository(ClothingDb);
   
    if (search) {
        const extracted = operationExtraction(search);
    
        // Add onto each of the arrays
    
        if (extracted.size) {
            size.push(...extracted.size);
        }
    
        if (extracted.condition) {
            condition.push(...extracted.condition);
        }
    
        if (extracted.gender) {
            gender.push(...extracted.gender);
        }
    
        if (extracted.style) {
            style.push(...extracted.style);
        }
    
        if (extracted.type) {
            type.push(...extracted.type);
        }
    }

    // Make a dynamic query builder
    const queryBuilder = clothingRepository.createQueryBuilder('item');

    if (colour) {
        queryBuilder.andWhere('item.colour IN (:...colour)', { colour });
    }
    
    if (size) {
        queryBuilder.andWhere('item.size IN (:...size)', { size });
    }

    if (condition) {
        queryBuilder.andWhere('item.condition IN (:...condition)', { condition });
    }

    if (gender) {
        queryBuilder.andWhere('item.gender IN (:...gender)', { gender });
    }

    if (style) {
        queryBuilder.andWhere('item.style IN (:...style)', { style });
    }

    if (type) {
        queryBuilder.andWhere('item.type IN (:...type)', { type });
    }

    // It has not been liked / disliked before
    queryBuilder.andWhere(
        new NotBrackets((qb) => {
            qb.where('item.clothingId IN (:...liked)', { liked })
            .orWhere('item.clothingId IN (:...disliked)', { disliked })
        }),
    );

    // Not the user's own clothes
    queryBuilder.andWhere('item.userId != :userId', { userId });

    // Max amount items returned
    queryBuilder.limit(amount);

    // Need to make sure location is close
    // TODO this will depend on:
    // 1) How we store location, is it a coords or suburb or what
    // 2) If we like cats or dogs more


    // Return
    const items = await queryBuilder.getMany();

    console.log(items);

    res.status(200).json(items);
    return;
}

export async function getUserClothing(req:Request<UserRouteParams, any, any>, res: Response) {
    const { userId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const items = await clothingRepository.find({ where: { userId } });

    res.status(200).json(items);
}

export async function deleteClothing(req:Request<ClothingRouteParams, any, any>, res: Response) {
    const { userId, clothingId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId: clothingId } });

    if (item.userId !== userId) {
        res.status(403).json("Not allowed to delete this item");
        return;
    }

    if (!item) {
        res.status(404).json("Item not found");
        return;
    }

    await clothingRepository.remove(item);

    res.status(200).json("Item deleted");
}

export async function likeClothing(req:Request<ClothingRouteParams, any, any>, res: Response) {
    const { userId, clothingId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    if (!clothingId) {
        res.status(400).json("Missing clothingId");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId: clothingId } });

    if (!item) {
        res.status(404).json("Item not found");
        return;
    }

    user.liked.push(clothingId);
    await userRepository.save(user);

    res.status(200).json("Item liked");
}

export async function dislikeClothing(req:Request<ClothingRouteParams, any, any>, res: Response) {
    const { userId, clothingId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    if (!clothingId) {
        res.status(400).json("Missing clothingId");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId: clothingId } });

    if (!item) {
        res.status(404).json("Item not found");
        return;
    }

    user.disliked.push(clothingId);
    await userRepository.save(user);

    res.status(200).json("Item disliked");
}

export async function getLikedClothing(req:Request<UserRouteParams, any, any>, res: Response) {
    const { userId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const items = await clothingRepository.find({ where: { clothingId: user.liked } });

    res.status(200).json(items);
}


export async function patchClothing(req:Request<ClothingRouteParams, any, ClothingBodyParams>, res: Response) {
    const { userId, clothingId } = req.params;
    const { 
        colour,
        size,
        condition,
        gender,
        style,
        bio,
        type
    } = req.body;

    // Validate userId
    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!userId) {
        res.status(404).json('User not found');
        return;
    }

    // Validate clothingId
    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId } });

    if (!item) {
        res.status(404).json('Item not found');
        return;
    }

    // Checking user owns the clothes
    if (item.userId !== userId) {
        res.status(403).json('Unauthorised to edit this item');
        return;
    }

    // Update the item
    if (colour) {
        item.colour = colour;
    }

    if (size) {
        item.size = size;
    }

    if (condition) {
        item.condition = condition;
    }

    if (gender) {
        item.gender = gender;
    }

    if (style) {
        item.style = style;
    }

    if (bio) {
        item.bio = bio;
    }

    if (type) {
        item.type = type;
    }

    await clothingRepository.save(item);

    res.status(200).json('Item updated');
    return;

  }
  